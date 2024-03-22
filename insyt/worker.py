from redis import Redis
from rq import Queue, Worker


def main():
    # Create a Redis connection
    redis_conn = Redis()

    # Create a queue
    q = Queue(connection=redis_conn)

    # Create a worker
    w = Worker([q], connection=redis_conn)

    # Process the queue
    w.work()


if __name__ == "__main__":
    main()
