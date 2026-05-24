from sqlalchemy import Column, Integer, String, Boolean

from database import Base


class NormalizedRecord(Base):
    __tablename__ = "normalized_record"
    id = Column(Integer, primary_key=True, index=True)
    source_type = Column(String)
    activity_type = Column(String)
    quantity = Column(Integer)
    unit = Column(String)
    status = Column(String)
    is_suspicious = Column(Boolean)
