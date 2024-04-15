from pydantic import BaseModel
from typing import Optional


class DataRequest(BaseModel):
    pass


class LogLine(BaseModel):
    # (id INTEGER PRIMARY KEY, date_time text, file_path text, line_number int, line text, context text, classification text, confidence real, analysis text)
    id: int
    date_time: Optional[str] = None
    file_path: Optional[str] = None
    line_number: Optional[int] = None
    line: Optional[str] = None
    context: Optional[str] = None
    classification: Optional[str] = None
    confidence: Optional[float] = None
    analysis: Optional[str] = None


class TopAttackResponse(BaseModel):
    classification: Optional[str] = None
    count: Optional[int] = None


class AttackTypesResponse(BaseModel):
    classification: Optional[str] = None


class AttackTypesAllResponse(BaseModel):
    classification: Optional[str] = None
    count: Optional[int] = None
