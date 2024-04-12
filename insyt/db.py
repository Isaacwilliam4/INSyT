import sqlite3


class Database:
    def __init__(self, db):
        self.conn = sqlite3.connect(db)
        self.cur = self.conn.cursor()
        self.cur.execute(
            """CREATE TABLE IF NOT EXISTS insyt
            (id INTEGER PRIMARY KEY, date_time text, file_path text, line_number int, line text, context text, classification text, confidence real, analysis text)"""
        )
        self.conn.commit()

    def fetch(self):
        self.cur.execute("SELECT * FROM insyt")
        rows = self.cur.fetchall()
        return rows

    def fetch_sql(self, sql):
        self.cur.execute(sql)
        rows = self.cur.fetchall()
        return rows

    def insert(
        self,
        date_time=None,
        file_path=None,
        line_number=None,
        line=None,
        context=None,
        classification=None,
        confidence=None,
        analysis=None,
    ):
        self.cur.execute(
            "INSERT INTO insyt VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                date_time,
                file_path,
                line_number,
                line,
                context,
                classification,
                confidence,
                analysis,
            ),
        )
        self.conn.commit()

    def remove(self, id):
        self.cur.execute("DELETE FROM insyt WHERE id=?", (id,))
        self.conn.commit()

    def update(
        self,
        id,
        date_time=None,
        file_path=None,
        line_number=None,
        line=None,
        context=None,
        classification=None,
        confidence=None,
        analysis=None,
    ):
        query = "UPDATE insyt SET "
        params = []
        if date_time is not None:
            query += "date_time = ?, "
            params.append(date_time)
        if file_path is not None:
            query += "file_path = ?, "
            params.append(file_path)
        if line_number is not None:
            query += "line_number = ?, "
            params.append(line_number)
        if line is not None:
            query += "line = ?, "
            params.append(line)
        if context is not None:
            query += "context = ?, "
            params.append(context)
        if classification is not None:
            query += "classification = ?, "
            params.append(classification)
        if confidence is not None:
            query += "confidence = ?, "
            params.append(confidence)
        if analysis is not None:
            query += "analysis = ?, "
            params.append(analysis)
        query = query[:-2]  # Remove the trailing comma and space
        query += " WHERE id = ?"
        params.append(id)
        self.cur.execute(query, tuple(params))
        self.conn.commit()

    def purge(self):
        self.cur.execute("DELETE FROM insyt")
        self.conn.commit()

    def __del__(self):
        self.conn.close()
