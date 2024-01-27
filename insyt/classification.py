import logging

from insyt.db import Database
from insyt.inference import run_model

log = logging.getLogger("INSyT")

CATEGORIES = ['benign', 'priviledge escalation', 'scan', 'data exfiltration', 'webshell upload', 'command and control', 'password cracking']

def classify(database_file: str):
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
        class_num = run_model(file_line, previous_lines)
        if class_num != 0:
            attacks_detected += 1
        classification = CATEGORIES[class_num]
        db.update(row[0], classification=classification)
    
    if attacks_detected == 0:
        log.info("No attacks detected")
    else:
        log.info(f"Detected {attacks_detected} attacks!!!!")

