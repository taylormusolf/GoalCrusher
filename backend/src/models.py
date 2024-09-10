from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
# from .database import Base
from sqlalchemy.ext.declarative import declarative_base
# from backend.src.auth import verify_password

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    # hashed_password = Column(String)
    goals = relationship("Goal", back_populates="owner")

    # def verify_password(self, password: str):
    #     return verify_password(password, self.hashed_password)

class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    status = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))

    owner = relationship("User", back_populates="goals")
