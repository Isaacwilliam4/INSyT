import logging
import ollama

log = logging.getLogger("INSyT")

def run_model(file_line, previous_lines, classification):
    """Run the analysis model given the line and context"""
    log.debug(f"Running analysis model on line: {file_line}")
    log.debug(f"Previous lines: {previous_lines}")
    log.debug(f"Classification: {classification}")

    prompt = f"The following line has been classified as '{classification}':\n\n```{file_line}```\n\n" + \
        "Explain why it was classified as such and how I should respond."
    
    response = ollama.chat(model='insyt', messages=[{'role': 'user', 'content': prompt}])
    log.debug(f"Response: {response}")
    return response['message']['content']