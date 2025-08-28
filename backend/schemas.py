from pydantic import BaseModel, EmailStr
from typing import Optional

class GuestBase(BaseModel):
    name: str
    email: EmailStr
    attending: bool
    dietary_restrictions: Optional[str] = None
    plus_one_name: Optional[str] = None
    children_info: Optional[str] = None

class GuestCreate(GuestBase):
    pass

class Guest(GuestBase):
    id: int

    class Config:
        orm_mode = True
