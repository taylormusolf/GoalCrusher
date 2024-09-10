from pydantic import BaseModel
from typing import Optional

class GoalBase(BaseModel):
    title: str
    description: str
    status: str

class GoalCreate(GoalBase):
    pass

class GoalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class GoalResponse(GoalBase):
    id: int

class Goal(GoalBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    goals: list[Goal] = []

    class Config:
        from_attributes = True
