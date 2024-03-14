import logging

from rq import Queue
from redis import Redis

from insyt.db import Database
from insyt.inference import run_model, run_model_

from insyt.ollama import run_model_ as run_analysis_model

log = logging.getLogger("INSyT")

CATEGORIES = ['benign', 'priviledge escalation', 'scan', 'data exfiltration', 'webshell upload', 'command and control', 'password cracking']

def classify(database_file: str, model, tokenizer):
    # Connect to the database
    db = Database(database_file)

    # Fetch all lines where 'classification' is NULL
    null_classifications = db.fetch_sql("SELECT * FROM insyt WHERE classification IS NULL")
    log.debug(f"Found {len(null_classifications)} lines to classify")

    # Run each line through the model and update the database with the classification
    attacks_detected = 0
    for row in null_classifications:
        file_line = row[3]  # 'line' column
        previous_lines = row[4]  # 'context' column
        class_num = run_model(model, tokenizer, file_line, previous_lines)
        if class_num != 0:
            attacks_detected += 1
        classification = CATEGORIES[class_num]
        db.update(row[0], classification=classification)
    
    if attacks_detected == 0:
        log.info("No attacks detected")
    else:
        log.info(f"Detected {attacks_detected} attacks!!!!")


def classify_(database_file, lines, model):
    
    db = Database(database_file)
    # breakpoint()

    log_lines = lines[:,1]
    class_nums = run_model_(log_lines)
    for class_num, id, line in zip(class_nums, lines[:,0], log_lines):
        classification = CATEGORIES[class_num]
        id = int(id)+1
        db.update(id, classification=classification)

        if class_num != 0:
            log.info(f"Detected attack on line {id}: {line}")
            redis_conn = Redis()
            q = Queue(connection=redis_conn)
            q.enqueue(run_analysis_model, id, line, db.fetch_sql(f"SELECT * FROM insyt WHERE id={id}")[0][4], classification)
            
    return "chicken nuggets"


