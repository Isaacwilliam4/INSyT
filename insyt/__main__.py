import os
import sys
import atexit
import logging
import argparse
import datetime
import requests
import threading
import subprocess
from pathlib import Path
from insyt.db import Database
from insyt.file_watcher import watch_files
from insyt.worker import main as worker_main


def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser()
    # add -- arguments
    parser.add_argument(
        "--db", help="Database file to use", default="~/.cache/insyt/insyt.db"
    )
    parser.add_argument("--debug", help="Enable debug logging", action="store_true")
    parser.add_argument("--watch", nargs="+", help="List of files to watch")
    parser.add_argument(
        "--run", help="Run the redis worker to process jobs", action="store_true"
    )
    parser.add_argument(
        "--tokenizer", help="Tokenizer to use", default="distilbert-base-uncased"
    )
    parser.add_argument(
        "--model",
        help="Model to use",
        default="isaacwilliam4/distilbert-base-uncased-logline-v3",
    )
    parser.add_argument(
        "--max-batch-size",
        type=int,
        default=32,
        help="Maximum batch size for the model",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=5656,
        help="Port to run inference, db, and frontend servers",
    )
    parser.add_argument("--purge", help="Purge the database", action="store_true")
    args = parser.parse_args()

    if args.debug:
        logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(message)s")
        logging.getLogger("INSyT").setLevel(logging.DEBUG)
    else:
        logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")
        logging.getLogger("INSyT").setLevel(logging.INFO)

    logging.info("Starting INSyT")
    logging.debug(f"Command line arguments: {args}")

    assert args.watch or args.run, "Must specify either --watch, or --run"
    assert not (args.watch and args.run), "Cannot specify both --watch and --run"

    # check database parent directory
    db_path = Path(os.path.expanduser(args.db))
    os.environ["INSYT_DB_PATH"] = str(db_path)
    db_dir = db_path.parent
    if not os.path.exists(db_dir):
        os.makedirs(db_dir)
        logging.debug(f"Creating database directory: {db_dir}")

    # Start the inference server
    logging.info("Starting Inference Server at port %s", args.port)
    logging.info("Logs will be written to ~/.cache/insyt/insyt-inf-server.log")
    with open(
        os.path.expanduser("~/.cache/insyt/insyt-inf-server.log"), "a"
    ) as log_file:
        log_file.write(
            "_________________________ Starting Inference Server _________________________\n"
        )
        log_file.write(
            "_______________________________________________________________________________\n"
        )
        log_file.write(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "\n")

        server_process = subprocess.Popen(
            [
                "insyt-server",
                "--port",
                str(args.port),
            ],
            stdout=log_file,
            stderr=log_file,
        )

    # Wait for the server to start up
    while True:
        try:
            response = requests.get(f"http://localhost:{args.port}/health")
            if response.status_code == 200:
                break
        except requests.exceptions.ConnectionError:
            pass

    def cleanup():
        server_process.terminate()
        server_process.wait()

    atexit.register(cleanup)

    # Check if the user wants to run the classifier
    if args.run:
        logging.debug("Starting worker")
        worker_main()

    elif args.watch:
        # Create database object
        db = Database(db_path)
        if args.purge:
            logging.debug("Purging database")
            db.purge()
        logging.debug(f"Using database file: {args.db}")
        file_list = args.watch
        logging.debug(f"Configuring the following files to watch: {file_list}")
        logging.debug("Starting file watcher")
        # Watch files
        max_batch_size = args.max_batch_size

        watch_thread = threading.Thread(
            target=watch_files,
            args=(file_list, db_path, max_batch_size, f"http://localhost:{args.port}"),
            daemon=True,
        )

        watch_thread.start()

        def cleanup_watcher():
            watch_thread.join()

        atexit.register(cleanup_watcher)

        worker_main()


if __name__ == "__main__":
    # check must be located before importing code that uses 3.10 features
    if sys.version_info < (3, 10):
        exit("Error: Python version 3.10 or higher is required.")
    main()
