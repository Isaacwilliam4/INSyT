import logging
import requests

import numpy as np

from rq import Queue
from redis import Redis

from insyt.db import Database

from insyt.analysis import query_analysis

from insyt.server import ClassificationRequest


log = logging.getLogger("INSyT")

CATEGORIES = [
    "attacker:dnsteal:dnsteal-dropped",
    "attacker:dnsteal:dnsteal-received",
    "attacker:dnsteal:exfiltration-service",
    "attacker_change_user:escalate",
    "attacker_change_user:escalate:escalated_command:escalated_sudo_command",
    "attacker_http:dirb:foothold",
    "attacker_http:foothold:service_scan",
    "attacker_http:foothold:webshell_cmd",
    "attacker_http:foothold:webshell_upload",
    "attacker_http:foothold:wpscan",
    "attacker_vpn:escalate",
    "attacker_vpn:foothold",
    "benign",
    "crack_passwords:escalate",
    "dirb:foothold",
    "dns_scan:foothold",
    "escalate:escalated_command:escalated_sudo_command",
    "escalate:escalated_command:escalated_sudo_command:escalated_sudo_session",
    "escalate:webshell_cmd",
    "foothold:network_scan",
    "foothold:service_scan",
    "foothold:traceroute",
    "foothold:wpscan",
]


def classify(
    database_file,
    max_batch_size=32,
    inf_server="http://localhost:5656",
):
    db = Database(database_file)
    db_lines = np.array(
        db.fetch_sql("SELECT id, line FROM insyt where classification IS NULL")
    )
    ids = db_lines[:, 0].tolist()
    log_lines = db_lines[:, 1].tolist()
    request = ClassificationRequest(lines=log_lines, max_batch_size=max_batch_size)

    response = requests.post(f"{inf_server}/api/classify", json=request.model_dump())

    if response.status_code != 200:
        log.error(f"Failed to classify logs: {response.text}")
        raise Exception("Failed to classify logs")

    class_nums = response.json()["predictions"]
    confidences = response.json()["confidences"]

    # class_nums, confidences = run_model(log_lines, model, tokenizer)
    for class_num, id, line, confidence in zip(class_nums, ids, log_lines, confidences):
        classification = CATEGORIES[class_num]
        id = int(id)
        db.update(id, classification=classification, confidence=confidence)

        if classification != "benign":
            log.info(f"Detected attack on line {id}: {line}")
            redis_conn = Redis()
            q = Queue("analysis", connection=redis_conn)
            q.enqueue(
                query_analysis,
                id,
                line,
                db.fetch_sql(f"SELECT * FROM insyt WHERE id={id}")[0][4],
                classification,
                database_file,
                inf_server,
            )
