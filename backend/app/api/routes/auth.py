from __future__ import annotations

from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.core.security import demo_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.get("/me")
async def read_me(current_user: dict = Depends(get_current_user)):
    return {"user": current_user}


@router.post("/demo")
def demo_login():
    return {"user": demo_user(), "mode": "offline"}
