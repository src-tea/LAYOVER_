from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.dependencies import get_current_user
from app.repositories import store
from app.schemas.core import LayoverCreate

router = APIRouter(prefix="/api/layovers", tags=["layovers"])


@router.get("")
def list_layovers():
    return {"items": store.list_layovers()}


@router.post("")
def create_layover(payload: LayoverCreate, current_user: dict = Depends(get_current_user)):
    if payload.departure_time <= payload.arrival_time:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Departure time must be after arrival time")
    if payload.user_id is None:
        payload.user_id = current_user.get("id") or "user-1"
    record = store.create_layover(payload.model_dump())
    return {"item": record}
