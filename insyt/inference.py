import torch

def run_model_(batch: list, model):
    return [run_model(file_line, "") for file_line in batch]

def run_model(model, tokenizer, file_line, previous_lines):

  tokenized = tokenizer(file_line, padding=True, truncation=True, return_tensors="pt")
  output = model(**tokenized)
  # Extract the predicted probabilities or logits
  predictions = output.logits  # Or outputs.probabilities, depending on your model's output format

  # Convert probabilities/logits to predicted labels
  predicted_labels = torch.argmax(predictions, dim=1)

  return predicted_labels.item()
