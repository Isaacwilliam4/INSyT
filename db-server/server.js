const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 5656;

// Cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Connect to SQLite database
const db = new sqlite3.Database('../data/test_logs/insyt.db');

// Define routes
app.get('/api/data', (req, res) => {
  db.all('SELECT * FROM insyt', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Find Benign Attacks
app.get('/api/benign', (req, res) => {
  db.all('SELECT * FROM insyt WHERE classification = "benign"', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Find Non-Benign Attacks
app.get('/api/non-benign', (req, res) => {
  db.all('SELECT * FROM insyt WHERE classification != "benign"', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Find the top attack classification type where it's not benign
app.get('/api/top-attack', (req, res) => {
  db.all('SELECT classification, COUNT(*) as count FROM insyt WHERE classification != "benign" GROUP BY classification ORDER BY count DESC LIMIT 1', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Find the number of different classification types except benign
app.get('/api/attack-types', (req, res) => {
  db.all('SELECT DISTINCT classification FROM insyt WHERE classification != "benign"', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Find the number of different classification types including benign including the number of occurencies
app.get('/api/attack-types-all', (req, res) => {
  db.all('SELECT classification, COUNT(*) as count FROM insyt GROUP BY classification', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Select except for 'severity' column
app.get('/api/except-severity', (req, res) => {
  db.all('SELECT id, file_path, date_time, line_number, line, context, classification, confidence, analysis FROM insyt', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
