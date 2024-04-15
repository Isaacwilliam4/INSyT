# INSyT - Innovative Network Security Technologies

INSyT is a LLM-based Network Instrusion Detection System designed to detect and analyze anomalous and dangerous network and system behavior.

## Installation

This software can be installed using pip:
```bash
pip install insyt
```

**Note:** INSyT depends of the fact that you have a Redis Server running on your machine. Visit the Redis documentation to learn how to start a redis server for your OS.

**Note:** Generative AI analysis is built on [ollama](https://github.com/ollama/ollama). And as such it is important that ollama is installed on your machine. Visit there github to learn how to install on you specific system. After installing ollama, run the following to create the insyt model:
```bash
ollama create insyt -f insyt/models/ollama/Modelfile
```
You can still use the software without installing ollama, just without analysis and response reccomendations.

**Note for Windows users:** Redis is not officially supported on Windows. However, you can install Redis on Windows for development by following [these instructions](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/).

## Usage

### Start monitoring log lines
To start monitoring log files, run the following command in your terminal:
```bash
insyt --watch /path/to/your/file1 /path/to/your/file2 /path/to/dir/
```
Replace `/path/to/your/file1` and `/path/to/your/file2` with the actual paths to the files you want to watch. The file watcher will then monitor these files for any changes and load the new lines into the database. If you pass in a directory, the system will monitor all files within that directory.

It will also place new lines into a redis queue for classification and analysis, as well as process those jobs.

### Custom database paths
The INSyT sqlite database is by default contained at `~/.cache/insyt/insyt.db`. You can also pass in a different database filename using the --db flag. For example:
```bash
insyt --watch /path/to/your/file1 /path/to/your/file2 --db /path/to/your/db
```
Replace `/path/to/your/db` with the actual path to the database file you want to use.

### Debug

If you want to run in debug mode, use the flag `--debug`

## Frontend

The frontend application can be used to view and analyze logline classifications.

To run the frontend...


## For Developers/Contributors

Good luck...

