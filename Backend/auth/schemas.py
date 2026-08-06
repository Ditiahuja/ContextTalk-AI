from pydantic import BaseModel, EmailStr
from datetime import datetime


# ------------------------
# Signup Request
# ------------------------

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


# ------------------------
# Login Request
# ------------------------

class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ------------------------
# User Response
# ------------------------

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


# ------------------------
# JWT Token Response
# ------------------------

class Token(BaseModel):
    access_token: str
    token_type: str


# ------------------------
# JWT Payload
# ------------------------

class TokenData(BaseModel):
    email: str | None = None