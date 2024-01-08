from tokenizers import ByteLevelBPETokenizer
from transformers import BertForSequenceClassification, BertTokenizer
import torch

def run_model(file_line, previous_lines):
    # Initialize ByteLevelBPETokenizer
    tokenizer = ByteLevelBPETokenizer()

    # Tokenize the lines
    tokens = tokenizer.encode(file_line + ' '.join(previous_lines))

    # Load pre-trained BERT model for classification
    model = BertForSequenceClassification.from_pretrained('bert-base-uncased')

    # Concatenate the tokens and convert to tensor
    inputs = torch.tensor([tokens.ids])

    # Run the model
    with torch.no_grad():
        outputs = model(inputs)

    # Get the classification results
    results = outputs.logits.argmax(dim=1)
    return results
