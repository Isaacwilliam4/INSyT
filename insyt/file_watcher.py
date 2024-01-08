import time

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from inference import run_model

class FileWatcherHandler(FileSystemEventHandler):
    def __init__(self, file_list):
        self.file_list = file_list
        self.file_history = {file: [] for file in file_list}

    def on_modified(self, event):
        if event.src_path in self.file_list:
            with open(event.src_path, 'r') as f:
                lines = f.readlines()
                if len(lines) > len(self.file_history[event.src_path]):
                    new_lines = lines[len(self.file_history[event.src_path]):]
                    for i, line in enumerate(new_lines, start=len(self.file_history[event.src_path])):
                        previous_lines = lines[max(0, i-4):i]
                        run_model(line, previous_lines)    # TODO: implement run model in different file
                    self.file_history[event.src_path] = lines

def watch_files(file_list):
    event_handler = FileWatcherHandler(file_list)
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

