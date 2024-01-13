import sqlite3

class Database:
    def __init__(self, db):
        self.conn = sqlite3.connect(db)
        self.cur = self.conn.cursor()
        self.cur.execute(
            '''CREATE TABLE IF NOT EXISTS insyt
            (id INTEGER PRIMARY KEY, file_path text, line_number int, line text, context text, classification text, severity text, analysis text)''')
        self.conn.commit()

    def fetch(self):
        self.cur.execute("SELECT * FROM insyt")
        rows = self.cur.fetchall()
        return rows

    def insert(self, file_path=None, line_number=None, line=None, context=None, classification=None, severity=None, analysis=None):
        self.cur.execute("INSERT INTO insyt VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",
                         (file_path, line_number, line, context, classification, severity, analysis))
        self.conn.commit()

    def remove(self, id):
        self.cur.execute("DELETE FROM insyt WHERE id=?", (id,))
        self.conn.commit()

    def update(self, id, file_path=None, line_number=None, line=None, context=None, classification=None, severity=None, analysis=None):
        self.cur.execute("UPDATE insyt SET file_path = ?, line_number = ?, line = ?, context = ?, classification = ?, severity = ?, analysis = ? WHERE id = ?",
                         (file_path, line_number, line, context, classification, severity, analysis, id))
        self.conn.commit()

    def __del__(self):
        self.conn.close()