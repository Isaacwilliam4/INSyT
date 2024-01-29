import unittest
from unittest.mock import Mock, patch
from multiprocessing import Pool
from insyt.analysis import analyze, process_line
from insyt.db import Database

class TestAnalyze(unittest.TestCase):
    @patch('insyt.analysis.Database', autospec=True)
    @patch('insyt.analysis.Pool', autospec=True)
    def test_analyze(self, mock_pool, mock_database):
        # Setup
        mock_database_instance = mock_database.return_value
        mock_database_instance.fetch_sql.return_value = [
            (1, 'file_path', 'line_number', 'line', 'context', 'classification', 'severity', None),
            (2, 'file_path', 'line_number', 'line', 'context', 'classification', 'severity', None)
        ]
        mock_pool_instance = mock_pool.return_value
        mock_pool_instance.map.return_value = None

        # Call function
        analyze('database_file')

        # Assert
        mock_database.assert_called_once_with('database_file')
        mock_database_instance.fetch_sql.assert_called_once_with("SELECT * FROM insyt WHERE analysis IS NULL AND classification != 'benign' AND classification is not NULL")
        mock_pool.assert_called_once()
        # mock_pool_instance.map.assert_called_once_with(process_line, [('database_file', row) for row in mock_database_instance.fetch_sql.return_value])

if __name__ == '__main__':
    unittest.main()