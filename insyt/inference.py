import random
from transformers import AutoModelForSequenceClassification
from transformers import AutoTokenizer
import torch

# TODO: replace with actual model (Isaac/Bronze) Maybe move to a different directory if necessary
# def run_model(file_line, previous_lines):
    
file_line = "'172.17.130.196 - - [18/Jan/2022:12:32:37 +0000] GET /wp-includes/css/dist/editor/basketball HTTP/1.1 404 363 Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)\n"
model_ckpt = "distilbert-base-uncased"
model_name = 'isaacwilliam4/distilbert-base-uncased-logline-v3'
tokenizer = AutoTokenizer.from_pretrained(model_ckpt)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
tokenized = tokenizer(file_line, padding=True, truncation=True, return_tensors="pt")
output = model(**tokenized)
# Extract the predicted probabilities or logits
predictions = output.logits  # Or outputs.probabilities, depending on your model's output format

# Convert probabilities/logits to predicted labels
predicted_labels = torch.argmax(predictions, dim=1)

# Now you have the predicted labels
print(predicted_labels)

# randomly return a number 0-6, weighted 50% towards 0 and 10% towards 1-6
