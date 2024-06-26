import logging
import datetime

from watchfiles import watch

from rq import Queue
from redis import Redis

from insyt.db import Database
from insyt.classification import classify


def watch_files(
    file_list: list[str],
    database: str,
    max_batch_size: int = 32,
    inference_server: str = "http://localhost:5656",
):
    file_map = Database(database).get_file_map()
    for changes in watch(*file_list):
        for change in changes:
            file_path = change[1]
            if file_map.get(file_path) is None:
                file_map[file_path] = {"position": 0}
            with open(file_path) as f:
                lines = f.readlines()
                new_lines = lines[file_map[file_path]["position"] :]
                start_index = file_map[file_path]["position"]
                file_map[file_path]["position"] = len(lines)
            for i, line in enumerate(new_lines, start=start_index):
                previous_lines = lines[max(0, i - 4) : i]
                date_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                add_to_db(date_time, file_path, i + 1, line, previous_lines, database)
            queue_classifications(
                database, max_batch_size, inference_server=inference_server
            )


def add_to_db(date_time, file_path, line_number, line, previous_lines, db_name):
    database = Database(db_name)
    logging.debug(f"Adding to DB: {file_path}, {line_number}, {line}, {previous_lines}")
    database.insert(
        date_time=date_time,
        file_path=file_path,
        line_number=line_number,
        line=line,
        context="".join(previous_lines),
    )


def queue_classifications(
    db_name, max_batch_size, inference_server="http://localhost:5656"
):
    redis_conn = Redis()
    q = Queue("classification", connection=redis_conn)
    q.enqueue(classify, db_name, max_batch_size, inf_server=inference_server)
