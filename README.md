# INSyT - Innovative Network Security Technologies

INSyT is a LLM-based Network Instrusion Detection System designed to detect and analyze anomalous and dangerous network and system behavior.

## Installation

This software can be installed using pip on the github directory:
```bash
pip install insyt
```

## Usage

### File Watcher
To use the file watcher, run the following command in your terminal:
```bash
insyt --watch /path/to/your/file1 /path/to/your/file2
```
Replace `/path/to/your/file1` and `/path/to/your/file2` with the actual paths to the files you want to watch. The file watcher will then monitor these files for any changes and load the new lines into the database. It will also place new lines into a redis queue for classification.

**Note:** Currently the file watcher will clear the database every time you run it. This will be changed in the future.

**Note for Windows users:** Redis is not officially supported on Windows. However, you can install Redis on Windows for development by following [these instructions](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/).

### Detecting and Analyzing Attacks
To detect attacks and suspicious behavior, you can use the `--run` option:
```bash
insyt --run
```
This will start pulling jobs off of the redis queue in the order that they were put on. This will either classify new lines in the database, or analyze classified lines, depending on what is in the queue.

**Note:** Generative AI analysis is built on [ollama](https://github.com/ollama/ollama). And as such it is important that ollama is installed on your machine. Visit there github to learn how to install on you specific system. After installing ollama, run the following to create the insyt model:
```bash
ollama create insyt -f insyt/models/ollama/Modelfile
```



### Custom database paths
You can also pass in a different database filename using --db. For example:
```bash
insyt --watch /path/to/your/file1 /path/to/your/file2 --db /path/to/your/db
```
Replace `/path/to/your/db` with the actual path to the database file you want to use.

### Debug

If you want to run in debug mode, use the flag `--debug`



TODO: Explain the rest of the usage

Running the frontend (download frontend repo and do npm stuff)


## For Developers/Contributors

You can run all unit tests by running `python -m unittest` after isntalling insyt in your venv.

