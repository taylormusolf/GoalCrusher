from sqlalchemy.orm import Session
from . import models, schemas
from fastapi import HTTPException, status

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session):
    return db.query(models.User)

def create_goal(db: Session, goal: schemas.GoalCreate, user_id: int):
    db_goal = models.Goal(**goal.dict(), user_id=user_id)
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal

def update_goal(db: Session, update_goal: schemas.GoalUpdate, goal_id: int):
    goal = db.query(models.Goal).filter(models.Goal.id == goal_id).first()
    
    if goal:
        goal.title = update_goal.title
        goal.description = update_goal.description
        goal.status = update_goal.status

        db.commit()
        return goal
    else:
        raise ValueError("Goal not found")

def delete_goal(db: Session, goal_id: int):
    goal = db.query(models.Goal).filter(models.Goal.id == goal_id).first()
    
    if goal:
        db.delete(goal)
        
        db.commit()
        return {"detail": "Goal deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Goal not found")


def get_goals(db: Session, user_id: int):
    return db.query(models.Goal).filter(models.Goal.user_id == user_id).all()
