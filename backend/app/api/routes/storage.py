from __future__ import annotations

from fastapi import APIRouter, HTTPException, Query, status

from app.repositories import store
from app.services.pricing_service import estimate_storage_quote

router = APIRouter(prefix="/api/storage", tags=["storage"])


@router.get("")
def list_storage(airport_code: str | None = Query(default=None)):
    return {"items": store.list_storage_facilities(airport_code)}


@router.get("/{facility_id}")
def read_storage(facility_id: str):
    facility = store.get_storage_facility(facility_id)
    if not facility:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Storage facility not found")
    return {"item": facility}


@router.get("/{facility_id}/quote")
def storage_quote(facility_id: str, people_count: int = 1, group_size: int = 1):
    facility = store.get_storage_facility(facility_id)
    if not facility:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Storage facility not found")
    quote = estimate_storage_quote(facility, requested_users=max(1, people_count), group_size=max(1, group_size))
    return {"facility_id": facility_id, "quote": quote}
