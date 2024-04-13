import logging
import requests

from insyt.inference_server import AnalysisRequest
from insyt.db import Database

log = logging.getLogger("INSyT")


def query_analysis(
    id,
    file_line,
    previous_lines: str,
    classification,
    database_file: str,
    inference_server: str = "http://localhost:8000",
):
    """Run the analysis model given the line and context"""
    log.debug(f"Running analysis model on line: {file_line}")
    log.debug(f"Previous lines: {previous_lines}")
    log.debug(f"Classification: {classification}")

    request = AnalysisRequest(
        file_line=file_line,
        previous_lines=previous_lines,
        classification=classification,
    )

    response = requests.post(inference_server + "/analyze", json=request.model_dump())

    if response.status_code != 200:
        log.error(f"Failed to analyze line: {file_line}")
        log.debug(f"Response: {response.text}")
        raise Exception("Failed to analyze line")

    response_json = response.json()

    log.debug(f"Response: {response_json}")

    db = Database(database_file)
    db.update(id, analysis=response_json["response"])
    return response_json["response"]
