import argparse
from typing import List

from fastapi import FastAPI
from pydantic import BaseModel

import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer

import numpy as np

import ollama

from insyt.db_api import router as db_router


class ClassificationRequest(BaseModel):
    lines: List[str]
    max_batch_size: int = 32


class ClassificationResponse(BaseModel):
    predictions: List[int]
    confidences: List[float]


class AnalysisRequest(BaseModel):
    file_line: str
    previous_lines: str
    classification: str


class AnalysisResponse(BaseModel):
    response: str


app = FastAPI()
app.include_router(db_router)

class_tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
class_model = AutoModelForSequenceClassification.from_pretrained(
    "isaacwilliam4/distilbert-base-uncased-logline-v3"
)


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/api/classify")
def run_classification_model(request: ClassificationRequest):
    max_batch_size = request.max_batch_size
    batch_size = min(max_batch_size, len(request.lines))
    batches = np.array_split(request.lines, len(request.lines) // batch_size)

    predictions_list = []
    confidences_list = []
    for batch in batches:
        batch = batch.tolist()
        tokenized = class_tokenizer(
            batch, padding=True, truncation=True, return_tensors="pt"
        )
        output = class_model(**tokenized)
        prob = torch.nn.functional.softmax(output.logits, dim=1)
        confidences = torch.max(prob, dim=1).values.tolist()
        predictions = torch.argmax(output.logits, dim=1)
        predictions_list += predictions.tolist()
        confidences_list += confidences

    response = ClassificationResponse(
        predictions=predictions_list, confidences=confidences_list
    )
    return response


@app.post("/api/analyze")
def run_analysis_model(request: AnalysisRequest):
    prompt = (
        f"The following line has been classified as '{request.classification}':\n\n```{request.file_line}```\n\n"
        + "The four lines preceding it are as follows:\n\n"
        + f"```\n{request.previous_lines}"
        + "Explain why it was classified as such and how I should respond."
    )

    ollama_response = ollama.chat(
        model="insyt", messages=[{"role": "user", "content": prompt}]
    )

    reponse = AnalysisResponse(response=ollama_response["message"]["content"])
    return reponse


def main():
    import uvicorn

    # get port as arg
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8000, help="Port to run server on")
    parser.add_argument(
        "--reload", action="store_true", help="Enable auto-reload", default=False
    )
    args = parser.parse_args()

    uvicorn.run("insyt.server:app", reload=args.reload, port=args.port)


if __name__ == "__main__":
    main()
