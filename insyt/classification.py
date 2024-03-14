import logging

from rq import Queue
from redis import Redis

from insyt.db import Database
from insyt.inference import run_model

from insyt.ollama import run_model as run_analysis_model

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


def classify(database_file, lines, tokenizer, model):
    db = Database(database_file)

    log_lines = lines[:, 1].tolist()
    class_nums = run_model(log_lines, model, tokenizer)
    for class_num, id, line in zip(class_nums, lines[:, 0], log_lines):
        classification = CATEGORIES[class_num]
        id = int(id) + 1
        db.update(id, classification=classification)

        if classification != "benign":
            log.info(f"Detected attack on line {id}: {line}")
            redis_conn = Redis()
            q = Queue(connection=redis_conn)
            q.enqueue(
                run_analysis_model,
                id,
                line,
                db.fetch_sql(f"SELECT * FROM insyt WHERE id={id}")[0][4],
                classification,
            )

    return "chicken nuggets"
