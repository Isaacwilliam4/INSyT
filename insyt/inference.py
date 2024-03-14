import torch


def run_model(batch: list, model, tokenizer):
    tokenized = tokenizer(batch, padding=True, truncation=True, return_tensors="pt")
    output = model(**tokenized)
    predictions = torch.argmax(output.logits, dim=1)
    breakpoint()
    return predictions.tolist()


# def run_model(model, tokenizer, file_line, previous_lines):
#     tokenized = tokenizer(file_line, padding=True, truncation=True, return_tensors="pt")
#     output = model(**tokenized)
#     # Extract the predicted probabilities or logits
#     predictions = (
#         output.logits
#     )  # Or outputs.probabilities, depending on your model's output format

#     # Convert probabilities/logits to predicted labels
#     predicted_labels = torch.argmax(predictions, dim=1)

#     breakpoint()
#     return predicted_labels.item()
