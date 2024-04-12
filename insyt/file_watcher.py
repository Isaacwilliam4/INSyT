import time
import logging
from os.path import dirname, abspath

import datetime

import numpy as np

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from rq import Queue
from redis import Redis

from transformers import AutoModelForSequenceClassification, AutoTokenizer

from insyt.db import Database
from insyt.classification import classify


class FileWatcherHandler(FileSystemEventHandler):
    def __init__(
        self,
        file_list,
        db_name: str,
        tokenizer_ckpt: str,
        model_name: str,
        max_batch_size: int = 32,
    ):
        self.file_list = [abspath(file) for file in file_list]
        self.file_history = {file: [] for file in self.file_list}
        self.db_name = db_name
        self.tokenizer = AutoTokenizer.from_pretrained(tokenizer_ckpt)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)
        self.max_batch_size = max_batch_size

    def on_modified(self, event):
        logging.debug("-----------------------------------------")
        logging.debug(f"File {event.src_path} was modified")

        if event.src_path in self.file_list:
            logging.debug(f"File {event.src_path} is in the list of files to watch")
            with open(event.src_path, "r") as f:
                lines = f.readlines()
                history_line_len = len(self.file_history[event.src_path])
                logging.debug(f"History line length: {history_line_len}")
                if len(lines) > history_line_len:
                    new_lines = lines[history_line_len:]
                    start_index = len(self.file_history[event.src_path])
                    new_lines_ = np.array(
                        list(zip(range(start_index, len(lines) + 1), new_lines))
                    )
                    database = Database(self.db_name)
                    for i, line in enumerate(
                        new_lines, start=len(self.file_history[event.src_path])
                    ):
                        previous_lines = lines[max(0, i - 4) : i]
                        date_time = datetime.datetime.now().strftime(
                            "%Y-%m-%d %H:%M:%S"
                        )
                        self.add_to_db(
                            date_time,
                            event.src_path,
                            i + 1,
                            line,
                            previous_lines,
                            database,
                        )
                    self.queue_classifications(new_lines_)
                    self.file_history[event.src_path] = lines

    def add_to_db(
        self,
        date_time,
        file_path,
        line_number,
        line,
        previous_lines,
        database: Database = None,
    ):
        if database is None:
            database = Database(self.db_name)
        logging.debug(
            f"Adding to DB: {file_path}, {line_number}, {line}, {previous_lines}"
        )
        database.insert(
            date_time=date_time,
            file_path=file_path,
            line_number=line_number,
            line=line,
            context="".join(previous_lines),
        )

    def queue_classifications(self, lines):
        # batch the lines
        batch_size = min(self.max_batch_size, len(lines))
        batches = np.array_split(lines, len(lines) // batch_size)
        redis_conn = Redis()
        q = Queue(connection=redis_conn)
        for batch in batches:
            q.enqueue(classify, self.db_name, batch, self.tokenizer, self.model)


def watch_files(
    file_list,
    database: str,
    tokenizer_ckpt: str,
    model_name: str,
    max_batch_size: int = 32,
):
    event_handler = FileWatcherHandler(file_list, database, tokenizer_ckpt, model_name)
    logging.debug(f"Starting observers on files: {file_list}")
    observer = Observer()
    directories = set(dirname(file) for file in file_list)

    for directory in directories:
        observer.schedule(event_handler, path=directory, recursive=False)
    observer.start()
    try:
        while True:
            time.sleep(0.5)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
