import unittest
from insyt.db import Database
import sqlite3

class TestDatabase(unittest.TestCase):
    def setUp(self):
        self.db = Database(":memory:")  # use in-memory database for testing

    def test_fetch(self):
        self.db.insert("file_path", "line_number", "line", "context", "classification", "severity", "analysis")
        rows = self.db.fetch()
        self.assertEqual(rows, [(1, 'file_path', 'line_number', 'line', 'context', 'classification', 'severity', 'analysis')])

    def test_insert(self):
        self.db.insert("file_path", "line_number", "line", "context", "classification", "severity", "analysis")
        self.db.cur.execute("SELECT * FROM insyt")
        rows = self.db.cur.fetchall()
        self.assertEqual(rows, [(1, 'file_path', 'line_number', 'line', 'context', 'classification', 'severity', 'analysis')])

    def test_remove(self):
        self.db.insert("file_path", "line_number", "line", "context", "classification", "severity", "analysis")
        self.db.remove(1)
        self.db.cur.execute("SELECT * FROM insyt")
        rows = self.db.cur.fetchall()
        self.assertEqual(rows, [])

    def test_update(self):
        self.db.insert("file_path", "line_number", "line", "context", "classification", "severity", "analysis")
        self.db.update(1, "new_file_path", "new_line_number", "new_line", "new_context", "new_classification", "new_severity", "new_analysis")
        self.db.cur.execute("SELECT * FROM insyt")
        rows = self.db.cur.fetchall()
        self.assertEqual(rows, [(1, 'new_file_path', 'new_line_number', 'new_line', 'new_context', 'new_classification', 'new_severity', 'new_analysis')])

    def tearDown(self):
        self.db.conn.close()

if __name__ == '__main__':
    unittest.main()