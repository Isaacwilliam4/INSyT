import pandas as pd
import numpy as np
import sys
import time
import os

args = sys.argv

filepath = args[1]
delay = 1.0

print('Reading Data')
log_df = pd.read_csv('./data/log_line_samp.csv', sep='|')


print('Starting simulation')
while True:
    time.sleep(delay)
    with open(os.path.abspath(filepath), 'a') as f:
        print('added line')
        line = log_df['log_line'].sample(1).item()
        f.write(f'{line}')