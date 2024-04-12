import torch


def run_model(batch: list, model, tokenizer):
    tokenized = tokenizer(batch, padding=True, truncation=True, return_tensors="pt")
    output = model(**tokenized)
    prob = torch.nn.functional.softmax(output.logits, dim=1)
    confidences = torch.max(prob, dim=1).values.tolist()
    predictions = torch.argmax(output.logits, dim=1)
    return predictions.tolist(), confidences
