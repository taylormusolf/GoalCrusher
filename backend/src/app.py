#running uvicorn server from backend folder -> uvicorn src.app:app --reload
import os
from fastapi import FastAPI, Request, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from . import models, schemas, crud, database
# from backend.src.auth import create_access_token, get_current_user, verify_password, User, Token, TokenData

# Load environment variables from .env file
load_dotenv()

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Set up OpenAI API key
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

app = FastAPI(
    title="Goal App",
    description="An app for setting and achieving your goals",
    version="0.1"
)

origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173"  # Allow both localhost and 127.0.0.1
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # Allow specific origins
    allow_credentials=True,  # Allow credentials (cookies, authorization headers, etc.)
    allow_methods=["*"],     # Allow all HTTP methods
    allow_headers=["*"],     # Allow all headers
)

@app.post("/chat", description="Get chat responses through this POST endpoint") 
async def chat(request: Request):
    body = await request.json()
    return JSONResponse(content={"Your message": body}, status_code=200)

# Define a request model
class PromptRequest(BaseModel):
    prompt: str
    max_tokens: int = 100

@app.post("/generate")
async def generate_text(request: PromptRequest):
    try:
        # Send a request to OpenAI's API
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {
                    "role": "user",
                    "content": request.prompt,
                }
            ],
            model="gpt-3.5-turbo",
            max_tokens=request.max_tokens
        )

        # Extract the generated text
        generated_text = chat_completion.choices[0].message.content.strip()
        return {"text": generated_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

@app.post("/goals/", response_model=schemas.Goal)
def create_goal(goal: schemas.GoalCreate, user_id: int, db: Session = Depends(get_db)):
    return crud.create_goal(db=db, goal=goal, user_id=user_id)

@app.patch("/goals/{goal_id}", response_model=schemas.Goal)
def update_goal(goal: schemas.GoalCreate, goal_id: int, db: Session = Depends(get_db)):
    return crud.update_goal(db=db, update_goal=goal, goal_id=goal_id)

@app.delete("/goals/{goal_id}", response_model=None)
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    return crud.delete_goal(db=db, goal_id=goal_id)

@app.get("/goals/{user_id}", response_model=list[schemas.Goal])
def read_goals(user_id: int, db: Session = Depends(get_db)):
    return crud.get_goals(db=db, user_id=user_id)

@app.get("/users", response_model=list[schemas.User])
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db=db)

# @app.post("/token", response_model=Token)
# def login(form_data: User, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.username == form_data.username).first()
#     if not user or not verify_password(form_data.password, user.hashed_password):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#         )
#     access_token = create_access_token(data={"username": user.username})
#     return {"access_token": access_token, "token_type": "bearer"}

# @app.get("/users/me", response_model=User)
# def read_users_me(current_user: TokenData = Depends(get_current_user)):
#     return current_user

# @app.get("/secure-endpoint")
# def secure_endpoint(current_user: TokenData = Depends(get_current_user)):
#     return {"message": "This is a secure endpoint", "user": current_user.username}