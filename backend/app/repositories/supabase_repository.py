from __future__ import annotations

from typing import Any

from supabase import create_client

from app.core.config import settings
from app.repositories.memory_store import store as memory_store


class SupabaseRepository:
    def __init__(self):
        self.enabled = bool(settings.supabase_url and settings.supabase_service_role_key)
        self.client = None

        if self.enabled:
            try:
                self.client = create_client(settings.supabase_url, settings.supabase_service_role_key)
            except Exception:
                self.enabled = False
                self.client = None

    def available(self) -> bool:
        return bool(self.client)

    def list_storage_facilities(self, airport_code: str | None = None):
        if not self.available():
            return memory_store.list_storage_facilities(airport_code)
        try:
            query = self.client.table("storage_facilities").select("*")
            if airport_code:
                query = query.eq("airport_code", airport_code)
            response = query.execute()
            return list(response.data or [])
        except Exception:
            return memory_store.list_storage_facilities(airport_code)

    def get_storage_facility(self, facility_id: str):
        if not self.available():
            return memory_store.get_storage_facility(facility_id)
        try:
            response = self.client.table("storage_facilities").select("*").eq("id", facility_id).execute()
            items = response.data or []
            return items[0] if items else None
        except Exception:
            return memory_store.get_storage_facility(facility_id)

    def list_layovers(self, user_id: str | None = None):
        if not self.available():
            return memory_store.list_layovers(user_id)
        try:
            query = self.client.table("layovers").select("*")
            if user_id:
                query = query.eq("user_id", user_id)
            response = query.execute()
            return list(response.data or [])
        except Exception:
            return memory_store.list_layovers(user_id)

    def get_layover(self, layover_id: str):
        if not self.available():
            return memory_store.get_layover(layover_id)
        try:
            response = self.client.table("layovers").select("*").eq("id", layover_id).execute()
            items = response.data or []
            return items[0] if items else None
        except Exception:
            return memory_store.get_layover(layover_id)

    def create_layover(self, payload: dict[str, Any]):
        if not self.available():
            return memory_store.create_layover(payload)
        try:
            response = self.client.table("layovers").insert(payload).execute()
            return response.data[0] if getattr(response, "data", None) else payload
        except Exception:
            return memory_store.create_layover(payload)

    def list_bookings(self, user_id: str | None = None):
        if not self.available():
            return memory_store.list_bookings(user_id)
        try:
            query = self.client.table("bookings").select("*")
            if user_id:
                query = query.eq("user_id", user_id)
            response = query.execute()
            return list(response.data or [])
        except Exception:
            return memory_store.list_bookings(user_id)

    def create_booking(self, payload: dict[str, Any]):
        if not self.available():
            return memory_store.create_booking(payload)
        try:
            response = self.client.table("bookings").insert(payload).execute()
            return response.data[0] if getattr(response, "data", None) else payload
        except Exception:
            return memory_store.create_booking(payload)

    def create_payment(self, payload: dict[str, Any]):
        if not self.available():
            return memory_store.create_payment(payload)
        try:
            response = self.client.table("payments").insert(payload).execute()
            return response.data[0] if getattr(response, "data", None) else payload
        except Exception:
            return memory_store.create_payment(payload)

    def create_itinerary(self, payload: dict[str, Any]):
        if not self.available():
            return memory_store.create_itinerary(payload)
        try:
            response = self.client.table("itineraries").insert(payload).execute()
            return response.data[0] if getattr(response, "data", None) else payload
        except Exception:
            return memory_store.create_itinerary(payload)

    def list_itineraries(self, user_id: str | None = None):
        if not self.available():
            return memory_store.list_itineraries(user_id)
        try:
            query = self.client.table("itineraries").select("*")
            if user_id:
                query = query.eq("user_id", user_id)
            response = query.execute()
            return list(response.data or [])
        except Exception:
            return memory_store.list_itineraries(user_id)

    def cancel_booking(self, booking_id: str, user_id: str):
        if not self.available():
            return memory_store.cancel_booking(booking_id, user_id)
        try:
            response = self.client.table("bookings").update({"status": "cancelled"}).eq("id", booking_id).eq("user_id", user_id).execute()
            items = response.data or []
            return items[0] if items else memory_store.cancel_booking(booking_id, user_id)
        except Exception:
            return memory_store.cancel_booking(booking_id, user_id)

    def list_users(self):
        if not self.available():
            return memory_store.list_users()
        try:
            response = self.client.table("users").select("*").execute()
            return list(response.data or [])
        except Exception:
            return memory_store.list_users()

    def get_user(self, user_id: str):
        if not self.available():
            return memory_store.get_user(user_id)
        try:
            response = self.client.table("users").select("*").eq("id", user_id).execute()
            items = response.data or []
            return items[0] if items else None
        except Exception:
            return memory_store.get_user(user_id)


STORE = SupabaseRepository()
