import sys
import argparse
import logging
from insyt.db import Database
from insyt.file_watcher import watch_files
from insyt.worker import main as worker_main

# check must be located before importing code that uses 3.10 features
if sys.version_info < (3, 10):
    exit("Error: Python version 3.10 or higher is required.")


def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser()
    # add -- arguments
    parser.add_argument("--db", help="Database file to use", default="insyt.db")
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
        # Create and purge database object
        db = Database(args.db)
        db.purge()
        logging.debug(f"Using database file: {args.db}")
        file_list = args.watch
        logging.debug(f"Configuring the following files to watch: {file_list}")
        logging.debug("Starting file watcher")
        # Watch files
        watch_files(file_list, args.db, tokenizer_ckpt, model_name)

    # this is meant just to test some functionality during development TODO: Add actual runtime functionality at the end


if __name__ == "__main__":
    main()
