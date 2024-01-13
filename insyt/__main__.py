import sys
from insyt.db import Database

# check must be located before importing code that uses 3.10 features
if sys.version_info < (3, 10):
    exit("Error: Python version 3.10 or higher is required.")


def main():
    # Create database object
    db = Database("insyt.db")
    
    #this is meant just to test some functionality during development TODO: Add actual runtime functionality at the end
    breakpoint()


if __name__ == "__main__":
    main()