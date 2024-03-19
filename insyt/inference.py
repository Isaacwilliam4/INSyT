import torch


def run_model(batch: list, model, tokenizer):
    tokenized = tokenizer(batch, padding=True, truncation=True, return_tensors="pt")
    output = model(**tokenized)
    predictions = torch.argmax(output.logits, dim=1)
    return predictions.tolist()
