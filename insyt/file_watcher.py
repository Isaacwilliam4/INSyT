import time
import logging
from os.path import dirname, abspath

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from insyt.db import Database

class FileWatcherHandler(FileSystemEventHandler):
    def __init__(self, file_list, db_name: str):
        self.file_list = [abspath(file) for file in file_list]
        self.file_history = {file: [] for file in self.file_list}
        self.db_name = db_name

    def on_modified(self, event):
        logging.debug('-----------------------------------------')
        logging.debug(f'File {event.src_path} was modified')

        if event.src_path in self.file_list:
            logging.debug(f'File {event.src_path} is in the list of files to watch')
            with open(event.src_path, 'r') as f:
                lines = f.readlines()
                history_line_len = len(self.file_history[event.src_path])
                logging.debug(f'History line length: {history_line_len}')
                if len(lines) > history_line_len:
                    new_lines = lines[history_line_len:]
                    database = Database(self.db_name)
                    for i, line in enumerate(new_lines, start=len(self.file_history[event.src_path])):
                        previous_lines = lines[max(0, i-4):i]
                        self.add_to_db(event.src_path, i+1, line, previous_lines, database)
                    self.file_history[event.src_path] = lines

    def add_to_db(self, file_path, line_number, line, previous_lines, database: Database = None):
        if database is None:
            database = Database(self.db_name)
        logging.debug(f'Adding to DB: {file_path}, {line_number}, {line}, {previous_lines}')
        database.insert(file_path=file_path, line_number=line_number, line=line, context=''.join(previous_lines))


def watch_files(file_list, database: str):
    event_handler = FileWatcherHandler(file_list, database)
    logging.debug(f'Starting observers on files: {file_list}')
    observer = Observer()
    directories = set(dirname(file) for file in file_list)

    for directory in directories:
        observer.schedule(event_handler, path=directory, recursive=False)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
