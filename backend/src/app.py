#running uvicorn server from backend folder -> uvicorn src.app:app --reload
import os
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from . import schemas, crud, database
from starlette.responses import FileResponse

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
    "http://localhost:5173",
    "https://goal-crusher-app-d59414deaeb3.herokuapp.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # Allow specific origins
    allow_credentials=True,  # Allow credentials (cookies, authorization headers, etc.)
    allow_methods=["*"],     # Allow all HTTP methods
    allow_headers=["*"],     # Allow all headers
)


@app.post("/api/goals", response_model=schemas.Goal)
def create_goal(goal: schemas.GoalCreate, user_id: int, db: Session = Depends(get_db)):
    return crud.create_goal(db=db, goal=goal, user_id=user_id)



# Define a request model
class PromptRequest(BaseModel):
    prompt: str
    max_tokens: int = 100

@app.post("/api/generate_suggestion")
async def generate_text():
    try:
        # Send a request to OpenAI's API
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Respond in the form of JSON"},
                {
                    "role": "user",
                    "content": 'Provide a suggestion for a personal or professional goal that person might want to start.  Please respond in the form of JSON with a key of "title" which will be the title of the goal and "description" which will be the description of that goal.',
                }
            ],
            model="gpt-3.5-turbo",
            max_tokens=100
        )

        # Extract the generated text
        generated_text = chat_completion.choices[0].message.content.strip()
        return JSONResponse(content={"text": generated_text}, media_type="application/json")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate_suggestions_via_prompt")
async def generate_text(request: PromptRequest):
    try:
        # Send a request to OpenAI's API
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Respond in the form of JSON"},
                {
                    "role": "user",
                    "content": f'''Provide a 5 suggestions for a personal or professional goal that person might want to start based off the prompt: {request.prompt}.  
                    Please respond in the form of JSON with an array of objects containing a key of "title" which will be the title of the goal and "description" which will be the description of that goal.''',
                }
            ],
            model="gpt-3.5-turbo",
            max_tokens=500
        )

        # Extract the generated text
        generated_text = chat_completion.choices[0].message.content.strip()
        return JSONResponse(content={"text": generated_text}, media_type="application/json")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate_quote")
async def generate_text():
    try:
        # Send a request to OpenAI's API
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Respond in the form of JSON"},
                {
                    "role": "user",
                    "content": 'Provide a motivational quote in the form of JSON with a key of "quote".',
                }
            ],
            model="gpt-3.5-turbo",
            max_tokens=100
        )

        # Extract the generated text
        generated_text = chat_completion.choices[0].message.content.strip()
        return JSONResponse(content={"text": generated_text}, media_type="application/json")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)



@app.patch("/api/goals/{goal_id}", response_model=schemas.Goal)
def update_goal(goal: schemas.GoalCreate, goal_id: int, db: Session = Depends(get_db)):
    return crud.update_goal(db=db, update_goal=goal, goal_id=goal_id)

@app.delete("/api/goals/{goal_id}", response_model=None)
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    return crud.delete_goal(db=db, goal_id=goal_id)

@app.get("/api/goals/{user_id}", response_model=list[schemas.Goal])
def read_goals(user_id: int, db: Session = Depends(get_db)):
    return crud.get_goals(db=db, user_id=user_id)

@app.get("/api/users", response_model=list[schemas.User])
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db=db)

# Serve React static files
if os.getenv("ENVIRONMENT") == "production":
    dist_folder_path = os.path.join(os.path.dirname(__file__), '../../frontend/dist')
    app.mount("/", StaticFiles(directory=dist_folder_path, html=True), name="static")

# Serve the main entry point of the React app (index.html) for all unmatched routes
@app.get("/")
async def serve_frontend():
    frontend_path = os.path.join(os.path.dirname(__file__), "../../frontend/dist/index.html")
    return FileResponse(frontend_path)

@app.get("/{path_name:path}")
async def catch_all(path_name: str):
     # If the request path contains a file extension, don't serve index.html
    if "." not in path_name:
        return FileResponse(os.path.join(os.path.dirname(__file__), "../../frontend/dist/index.html"))
    else:
        # Let StaticFiles handle the request for actual assets
        return None
    