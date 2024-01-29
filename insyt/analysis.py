import logging
from multiprocessing import Pool

from insyt.db import Database
from insyt.ollama import run_model

log = logging.getLogger("INSyT")

def analyze(database_file: str):
    """Perform analysis on the data."""
    db = Database(database_file)

    # Fetch all lines where 'analysis' is NULL
    lines = db.fetch_sql("SELECT * FROM insyt WHERE analysis IS NULL AND classification != 'benign' AND classification is not NULL")
    log.debug(f"Found {len(lines)} lines to analyze")

    # use multi processing to run each line through the model and update the database with the analysis
    # pass the database file and the row to the process_line function using multi processing and wait for it to finish
    with Pool() as pool:
        pool.map(process_line, [(database_file, row) for row in lines])

    log.info("Analysis complete")

def process_line(data: tuple):
    """Process a single line of data"""
    database_file, row = data

    db = Database('insyt.db')

    file_line = row[3]  # 'line' column
    previous_lines = row[4]  # 'context' column
    classification = row[5]  # 'classification' column

    analysis = run_model(file_line, previous_lines, classification)
    db.update(row[0], analysis=analysis)