from fastapi import Depends, APIRouter
from sqlalchemy import func
from sqlalchemy.orm import Session
from insyt.db import SessionLocal, engine, Base
from insyt import models, schemas

Base.metadata.create_all(bind=engine)

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/api/db/data", response_model=list[schemas.LogLine])
def get_data(db: Session = Depends(get_db)):
    return db.query(models.LogLine).all()


@router.get("/api/db/benign", response_model=list[schemas.LogLine])
def get_benign(db: Session = Depends(get_db)):
    return (
        db.query(models.LogLine).filter(models.LogLine.classification == "benign").all()
    )


@router.get("/api/db/non-benign", response_model=list[schemas.LogLine])
def get_non_benign(db: Session = Depends(get_db)):
    return (
        db.query(models.LogLine).filter(models.LogLine.classification != "benign").all()
    )


@router.get("/api/db/top-attack", response_model=list[schemas.TopAttackResponse])
def get_top_attack(db: Session = Depends(get_db)):
    return (
        db.query(
            models.LogLine.classification,
            func.count(models.LogLine.classification).label("count"),
        )
        .filter(models.LogLine.classification != "benign")
        .group_by(models.LogLine.classification)
        .order_by(func.count(models.LogLine.classification).desc())
        .limit(1)
        .all()
    )


@router.get("/api/db/attack-types", response_model=list[schemas.AttackTypesResponse])
def get_attack_types(db: Session = Depends(get_db)):
    return (
        db.query(models.LogLine.classification)
        .filter(models.LogLine.classification != "benign")
        .distinct()
        .all()
    )


@router.get(
    "/api/db/attack-types-all", response_model=list[schemas.AttackTypesAllResponse]
)
def get_attack_types_all(db: Session = Depends(get_db)):
    return (
        db.query(
            models.LogLine.classification,
            func.count(models.LogLine.classification).label("count"),
        )
        .group_by(models.LogLine.classification)
        .all()
    )


@router.get("/api/db/except-severity", response_model=list[schemas.LogLine])
def get_except_severity(severity: float, db: Session = Depends(get_db)):
    return db.query(models.LogLine).filter(models.LogLine.confidence > severity).all()
