from sqlalchemy import Column, Integer, String, Float
from insyt.db import Base


class LogLine(Base):
    __tablename__ = "insyt"
    # id INTEGER PRIMARY KEY, date_time text, file_path text, line_number int, line text, context text, classification text, confidence real, analysis text

    id = Column(Integer, primary_key=True, index=True)
    date_time = Column(String, index=True)
    file_path = Column(String, index=True)
    line_number = Column(Integer, index=True)
    line = Column(String, index=True)
    context = Column(String, index=True)
    classification = Column(String, index=True)
    confidence = Column(Float, index=True)
    analysis = Column(String, index=True)
