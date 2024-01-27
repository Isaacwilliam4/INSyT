import unittest
from unittest.mock import Mock, patch
from watchdog.events import FileModifiedEvent
from insyt.file_watcher import FileWatcherHandler
from insyt.db import Database

class TestFileWatcherHandler(unittest.TestCase):
    def setUp(self):
        self.file_list = ['/path/to/file1', '/path/to/file2']
        self.db_name = ":memory:"
        self.handler = FileWatcherHandler(self.file_list, self.db_name)

    @patch('builtins.open', new_callable=unittest.mock.mock_open, read_data='line1\nline2\nline3\n')
    def test_on_modified(self, mock_open):
        event = FileModifiedEvent(self.file_list[0])
        self.handler.on_modified(event)
        self.assertEqual(self.handler.file_history[self.file_list[0]], ['line1\n', 'line2\n', 'line3\n'])

    @patch('builtins.open', new_callable=unittest.mock.mock_open, read_data='line1\nline2\nline3\n')
    def test_on_modified_not_in_file_list(self, mock_open):
        event = FileModifiedEvent('/path/to/unwatched_file')
        self.handler.on_modified(event)
        self.assertNotIn('/path/to/unwatched_file', self.handler.file_history)

    def test_add_to_db(self):
        database = Database(self.db_name)
        self.handler.add_to_db(self.file_list[0], 1, 'line1\n', ['line0\n'], database)
        rows = database.fetch()
        self.assertEqual(rows, [(1, self.file_list[0], 1, 'line1\n', 'line0\n', None, None, None)])

    def tearDown(self):
        pass

if __name__ == '__main__':
    unittest.main()