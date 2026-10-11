from __future__ import annotations

from copy import deepcopy
from datetime import datetime, timezone
from typing import Any


class MemoryStore:
    def __init__(self):
        self.reset()

    def reset(self) -> None:
        self.users = {
            "user-1": {
                "id": "user-1",
                "email": "maya@example.com",
                "full_name": "Maya Chen",
                "role": "traveller",
            },
            "user-2": {
                "id": "user-2",
                "email": "sam@example.com",
                "full_name": "Sam Patel",
                "role": "traveller",
            },
            "user-3": {
                "id": "user-3",
                "email": "lina@example.com",
                "full_name": "Lina Gomez",
                "role": "traveller",
            },
        }
        self.layovers = {
            "layover-1": {
                "id": "layover-1",
                "user_id": "user-1",
                "airport_code": "DXB",
                "arrival_time": "2025-01-01T12:00:00+00:00",
                "departure_time": "2025-01-01T18:00:00+00:00",
                "baggage_size": "medium",
                "interests": ["food", "shopping", "spa"],
            },
            "layover-2": {
                "id": "layover-2",
                "user_id": "user-2",
                "airport_code": "DXB",
                "arrival_time": "2025-01-01T15:00:00+00:00",
                "departure_time": "2025-01-01T19:00:00+00:00",
                "baggage_size": "medium",
                "interests": ["food", "shopping", "museum"],
            },
            "layover-3": {
                "id": "layover-3",
                "user_id": "user-3",
                "airport_code": "LHR",
                "arrival_time": "2025-01-02T09:00:00+00:00",
                "departure_time": "2025-01-02T16:00:00+00:00",
                "baggage_size": "light",
                "interests": ["books", "coffee"],
            },
        }
        self.storage_facilities = {
            "facility-1": {
                "id": "facility-1",
                "name": "SkySafe Lockers",
                "airport_code": "DXB",
                "city": "Dubai",
                "base_price": 24.0,
                "sharing_allowed": True,
                "share_min_users": 2,
                "share_max_users": 4,
                "opening_hours": {"start": "06:00", "end": "23:00"},
                "distance_minutes": 12,
                "currency": "USD",
            },
            "facility-2": {
                "id": "facility-2",
                "name": "Passport Pods",
                "airport_code": "DXB",
                "city": "Terminal 3",
                "base_price": 18.0,
                "sharing_allowed": False,
                "share_min_users": 1,
                "share_max_users": 1,
                "opening_hours": {"start": "07:00", "end": "21:00"},
                "distance_minutes": 8,
                "currency": "USD",
            },
            "facility-3": {
                "id": "facility-3",
                "name": "LHR Lounge Lockers",
                "airport_code": "LHR",
                "city": "London",
                "base_price": 20.0,
                "sharing_allowed": True,
                "share_min_users": 2,
                "share_max_users": 3,
                "opening_hours": {"start": "05:00", "end": "22:00"},
                "distance_minutes": 16,
                "currency": "USD",
            },
        }
        self.bookings = {}
        self.payments = {}
        self.itineraries = {}
        self.access_logs = []

    def list_users(self):
        return [deepcopy(user) for user in self.users.values()]

    def get_user(self, user_id: str):
        return deepcopy(self.users.get(user_id))

    def create_layover(self, payload: dict[str, Any]) -> dict[str, Any]:
        layover_id = payload.get("id") or f"layover-{len(self.layovers) + 1}"
        record = {
            "id": layover_id,
            "user_id": payload.get("user_id") or "user-1",
            "airport_code": payload["airport_code"],
            "arrival_time": payload["arrival_time"].isoformat() if hasattr(payload["arrival_time"], "isoformat") else payload["arrival_time"],
            "departure_time": payload["departure_time"].isoformat() if hasattr(payload["departure_time"], "isoformat") else payload["departure_time"],
            "baggage_size": payload.get("baggage_size", "medium"),
            "interests": payload.get("interests", []),
        }
        self.layovers[layover_id] = record
        self.access_logs.append({
            "id": f"log-{len(self.access_logs) + 1}",
            "event": "layover_created",
            "user_id": record["user_id"],
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        return deepcopy(record)

    def list_layovers(self, user_id: str | None = None):
        layovers = list(self.layovers.values())
        if user_id:
            return [deepcopy(item) for item in layovers if item["user_id"] == user_id]
        return [deepcopy(item) for item in layovers]

    def get_layover(self, layover_id: str):
        return deepcopy(self.layovers.get(layover_id))

    def list_storage_facilities(self, airport_code: str | None = None):
        facilities = list(self.storage_facilities.values())
        if airport_code:
            return [deepcopy(item) for item in facilities if item["airport_code"] == airport_code]
        return [deepcopy(item) for item in facilities]

    def get_storage_facility(self, facility_id: str):
        return deepcopy(self.storage_facilities.get(facility_id))

    def create_booking(self, payload: dict[str, Any]) -> dict[str, Any]:
        booking_id = payload.get("id") or f"booking-{len(self.bookings) + 1}"
        record = {
            "id": booking_id,
            "layover_id": payload["layover_id"],
            "facility_id": payload["facility_id"],
            "user_id": payload.get("user_id", "user-1"),
            "members": payload.get("members", []),
            "status": payload.get("status", "confirmed"),
            "start_time": payload["start_time"].isoformat() if hasattr(payload["start_time"], "isoformat") else payload["start_time"],
            "end_time": payload["end_time"].isoformat() if hasattr(payload["end_time"], "isoformat") else payload["end_time"],
            "total_price": float(payload.get("total_price", 0.0)),
            "per_person_price": float(payload.get("per_person_price", 0.0)),
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        self.bookings[booking_id] = record
        self.access_logs.append({
            "id": f"log-{len(self.access_logs) + 1}",
            "event": "booking_created",
            "user_id": record["user_id"],
            "booking_id": booking_id,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        return deepcopy(record)

    def list_bookings(self, user_id: str | None = None):
        bookings = list(self.bookings.values())
        if user_id:
            return [deepcopy(item) for item in bookings if item["user_id"] == user_id]
        return [deepcopy(item) for item in bookings]

    def get_booking(self, booking_id: str):
        return deepcopy(self.bookings.get(booking_id))

    def cancel_booking(self, booking_id: str, user_id: str):
        booking = self.bookings.get(booking_id)
        if not booking:
            raise KeyError("Booking not found")
        if booking["user_id"] != user_id:
            raise PermissionError("Only the creator can cancel the booking")
        booking["status"] = "cancelled"
        return deepcopy(booking)

    def create_payment(self, payload: dict[str, Any]) -> dict[str, Any]:
        payment_id = payload.get("id") or f"payment-{len(self.payments) + 1}"
        reference = payload.get("reference") or f"SIM-{payment_id.upper()}"
        record = {
            "id": payment_id,
            "booking_id": payload["booking_id"],
            "amount": float(payload.get("amount", 0.0)),
            "currency": payload.get("currency", "USD"),
            "status": payload.get("status", "authorized"),
            "reference": reference,
            "method": payload.get("method", "demo"),
        }
        self.payments[payment_id] = record
        return deepcopy(record)

    def create_itinerary(self, payload: dict[str, Any]) -> dict[str, Any]:
        itinerary_id = payload.get("id") or f"itinerary-{len(self.itineraries) + 1}"
        record = {
            "id": itinerary_id,
            "layover_id": payload["layover_id"],
            "user_id": payload.get("user_id", "user-1"),
            "start_time": payload["start_time"].isoformat() if hasattr(payload["start_time"], "isoformat") else payload["start_time"],
            "end_time": payload["end_time"].isoformat() if hasattr(payload["end_time"], "isoformat") else payload["end_time"],
            "usable_minutes": int(payload.get("usable_minutes", 0)),
            "activities": payload.get("activities", []),
        }
        self.itineraries[itinerary_id] = record
        return deepcopy(record)

    def list_itineraries(self, user_id: str | None = None):
        itineraries = list(self.itineraries.values())
        if user_id:
            return [deepcopy(item) for item in itineraries if item["user_id"] == user_id]
        return [deepcopy(item) for item in itineraries]


store = MemoryStore()
