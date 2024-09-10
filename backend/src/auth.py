import os
from typing import Optional
from pydantic import BaseModel
from passlib.context import CryptContext
import jwt
import datetime
from fastapi import Depends, HTTPException, status, Request
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


# Replace this secret with a more secure one in production
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[datetime.timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return TokenData(**payload)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

def get_current_user(request: Request, token: str = Depends()):
    if not token:
        raise HTTPException(status_code=401, detail="Token missing")
    
    try:
        payload = decode_token(token)
        return payload  # Assuming payload is of type TokenData
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")
