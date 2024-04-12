import os
import sys
import argparse
import logging
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

    tokenizer_ckpt = args.tokenizer
    model_name = args.model

    # Check if the user wants to run the classifier
    if args.run:
        logging.debug("Starting worker")
        worker_main()

    elif args.watch:
        # check database parent directory
        db_path = Path(os.path.expanduser(args.db))
        db_dir = db_path.parent
        if not os.path.exists(db_dir):
            os.makedirs(db_dir)
            logging.debug(f"Creating database directory: {db_dir}")
        # Create and purge database object
        db = Database(db_path)
        db.purge()
        logging.debug(f"Using database file: {args.db}")
        file_list = args.watch
        logging.debug(f"Configuring the following files to watch: {file_list}")
        logging.debug("Starting file watcher")
        # Watch files
        watch_files(
            file_list,
            db_path,
            tokenizer_ckpt,
            model_name,
            max_batch_size=args.max_batch_size,
        )


if __name__ == "__main__":
    # check must be located before importing code that uses 3.10 features
    if sys.version_info < (3, 10):
        exit("Error: Python version 3.10 or higher is required.")
    main()
