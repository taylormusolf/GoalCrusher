from pydantic import BaseModel

class GoalBase(BaseModel):
    title: str

class GoalCreate(GoalBase):
    pass

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
