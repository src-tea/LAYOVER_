from __future__ import annotations

from fastapi import APIRouter, HTTPException, status

from app.repositories import store
from app.services.matching_service import find_candidates
from app.utils.time_utils import parse_datetime

router = APIRouter(prefix="/api/matches", tags=["matches"])


@router.get("")
def find_matches(airport_code: str | None = None, layover_id: str | None = None):
    layovers = store.list_layovers()
    if layover_id:
        selected = [item for item in layovers if item["id"] == layover_id]
        if not selected:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Layover not found")
        candidates = [item for item in layovers if item["id"] != layover_id]
        results = find_candidates(selected, candidates)
    else:
        if airport_code:
            layovers = [item for item in layovers if item["airport_code"].upper() == airport_code.upper()]
        results = []
        for index, first in enumerate(layovers):
            for second in layovers[index + 1 :]:
                results.extend(find_candidates([first], [second]))

    return {"items": results}
