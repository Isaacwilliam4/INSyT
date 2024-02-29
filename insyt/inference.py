import random

# TODO: replace with actual model (Isaac/Bronze) Maybe move to a different directory if necessary
def run_model(file_line, previous_lines):
    # randomly return a number 0-6, weighted 50% towards 0 and 10% towards 1-6
    return random.choices(range(7), weights=[10, 1, 1, 1, 1, 1, 1])[0]

def run_model_(batch: list):
    return [run_model(file_line, "") for file_line in batch]
