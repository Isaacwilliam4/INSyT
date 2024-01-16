import time
import logging

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class FileWatcherHandler(FileSystemEventHandler):
    def __init__(self, file_list):
        self.file_list = file_list
        self.file_history = {file: [] for file in file_list}

    def on_modified(self, event):
        logging.debug(f'File {event.src_path} was modified')
        if event.src_path in self.file_list:
            logging.debug(f'File {event.src_path} is in the list of files to watch')
            with open(event.src_path, 'r') as f:
                lines = f.readlines()
                if len(lines) > len(self.file_history[event.src_path]):
                    new_lines = lines[len(self.file_history[event.src_path]):]
                    for i, line in enumerate(new_lines, start=len(self.file_history[event.src_path])):
                        previous_lines = lines[max(0, i-4):i]
                        add_to_db(line, previous_lines)
                    self.file_history[event.src_path] = lines

def watch_files(file_list):
    event_handler = FileWatcherHandler(file_list)
    logging.info(f'Starting observers on files: {file_list}')
    observer = Observer()
    for file in file_list:
        observer.schedule(event_handler, path=file, recursive=False)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

def add_to_db(database, file_path, line_number, line, previous_lines):
    logging.debug(f'Adding to DB: {file_path}, {line_number}, {line}, {previous_lines}')