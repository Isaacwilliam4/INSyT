from redis import Redis
from rq import Queue, Worker


def main():
    # Create a Redis connection
    redis_conn = Redis()

    # Create a queue
    class_q = Queue("classification", connection=redis_conn)
    analysis_q = Queue("analysis", connection=redis_conn)

    # Create a worker
    w = Worker([class_q, analysis_q], connection=redis_conn)

    # Process the queue
    w.work()


if __name__ == "__main__":
    main()
