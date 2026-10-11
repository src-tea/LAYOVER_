from __future__ import annotations

from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field


class UserOut(BaseModel):
    id: str
    email: str
    full_name: str
    role: str = "member"


class LayoverCreate(BaseModel):
    airport_code: str = Field(..., min_length=3, max_length=10)
    arrival_time: datetime
    departure_time: datetime
    baggage_size: Literal["light", "medium", "heavy"] = "medium"
    interests: list[str] = Field(default_factory=list)
    user_id: Optional[str] = None


class LayoverOut(BaseModel):
    id: str
    user_id: str
    airport_code: str
    arrival_time: datetime
    departure_time: datetime
    baggage_size: str
    interests: list[str]


class MatchCandidate(BaseModel):
    id: str
    user_id: str
    airport_code: str
    score: int
    shared_minutes: int
    baggage_match: int
    interest_match: int


class StorageFacility(BaseModel):
    id: str
    name: str
    airport_code: str
    city: str
    base_price: float
    sharing_allowed: bool = True
    share_min_users: int = 2
    share_max_users: int = 4
    opening_hours: dict[str, str] = Field(default_factory=lambda: {"start": "06:00", "end": "23:00"})
    distance_minutes: int = 10
    currency: str = "USD"


class BookingCreate(BaseModel):
    layover_id: str
    facility_id: str
    start_time: datetime
    end_time: datetime
    members: list[str] = Field(default_factory=list)
    user_id: Optional[str] = None


class BookingOut(BaseModel):
    id: str
    layover_id: str
    facility_id: str
    status: str
    total_price: float
    per_person_price: float
    members: list[str]
    start_time: datetime
    end_time: datetime


class PaymentCreate(BaseModel):
    booking_id: str
    amount: float
    currency: str = "USD"
    method: str = "demo"


class PaymentOut(BaseModel):
    id: str
    booking_id: str
    status: str
    amount: float
    currency: str
    reference: str


class ItineraryActivity(BaseModel):
    title: str
    start_time: datetime
    end_time: datetime
    category: str
    duration_minutes: int


class ItineraryOut(BaseModel):
    id: str
    layover_id: str
    start_time: datetime
    end_time: datetime
    activities: list[ItineraryActivity]
    usable_minutes: int
