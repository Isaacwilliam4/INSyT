# INSyT - Innovative Network Security Technologies

INSyT is a LLM-based Network Instrusion Detection System designed to detect and analyze anomalous and dangerous network and system behavior.

## Installation

This software can be installed using pip on the github directory:
```bash
pip install https://github.com/Isaacwilliam4/Network_Intrusion
```

## Usage

### File Watcher
To use the file watcher, run the following command in your terminal:
```bash
python -m insyt --watch /path/to/your/file1 /path/to/your/file2
```
Replace `/path/to/your/file1` and `/path/to/your/file2` with the actual paths to the files you want to watch. The file watcher will then monitor these files for any changes and load the new lines into the database.

**Note:** Currently the file watcher will clear the database every time you run it. This will be changed in the future.

### Detecting Attacks
To detect attacks and suspicious behavior, you can use the `--detect` option:
```bash
python -m insyt --detect
```
This will run the classification algorithm on the lines in the database. If no files have been watched, it will not detect any attacks.

### Analyzing Detected Attacks
To analyze detected attacks using INSyT's generative AI security assistant, you can use the `--analyze` option:
```bash
python -m insyt --analyze
```


### Custom database paths
You can also pass in a different database filename using --db. For example:
```bash
python -m insyt --watch /path/to/your/file1 /path/to/your/file2 --db /path/to/your/db
```
Replace `/path/to/your/db` with the actual path to the database file you want to use.

### Debug

If you want to run in debug mode, use the flag `--debug`



TODO: Explain the rest of the usage


## For Developers/Contributors

You can run all unit tests by running `python -m unittest` after isntalling insyt in your venv.

