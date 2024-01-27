import unittest
from unittest.mock import Mock, patch
from insyt.classification import classify, CATEGORIES
from insyt.db import Database

class TestClassify(unittest.TestCase):
    @patch('insyt.classification.Database', autospec=True)
    @patch('insyt.classification.run_model', return_value=0)
    def test_classify_no_attacks(self, mock_run_model, mock_database):
        # Setup
        mock_database_instance = mock_database.return_value
        mock_database_instance.fetch_sql.return_value = [
            (1, 'file_path', 'line_number', 'line', 'context', None, 'severity', 'analysis')
        ]

        # Call function
        classify('database_file')

        # Assert
        mock_database.assert_called_once_with('database_file')
        mock_database_instance.fetch_sql.assert_called_once_with("SELECT * FROM insyt WHERE classification IS NULL")
        mock_run_model.assert_called_once_with('line', 'context')
        mock_database_instance.update.assert_called_once_with(1, classification=CATEGORIES[0])

    @patch('insyt.classification.Database', autospec=True)
    @patch('insyt.classification.run_model', return_value=1)
    def test_classify_with_attacks(self, mock_run_model, mock_database):
        # Setup
        mock_database_instance = mock_database.return_value
        mock_database_instance.fetch_sql.return_value = [
            (1, 'file_path', 'line_number', 'line', 'context', None, 'severity', 'analysis'),
            (2, 'file_path', 'line_number', 'line', 'context', None, 'severity', 'analysis')
        ]

        # Call function
        classify('database_file')

        # Assert
        mock_database.assert_called_once_with('database_file')
        mock_database_instance.fetch_sql.assert_called_once_with("SELECT * FROM insyt WHERE classification IS NULL")
        self.assertEqual(mock_run_model.call_count, 2)
        self.assertEqual(mock_database_instance.update.call_count, 2)
        mock_database_instance.update.assert_any_call(1, classification=CATEGORIES[1])
        mock_database_instance.update.assert_any_call(2, classification=CATEGORIES[1])

if __name__ == '__main__':
    unittest.main()