from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

import jwt

from app.core.config import settings


def demo_user() -> dict[str, Any]:
    return {
        "id": "demo-user-id",
        "email": "demo@layover.app",
        "full_name": "Demo Traveller",
        "role": "demo",
    }


def is_offline_mode() -> bool:
    return not settings.supabase_url and not settings.supabase_anon_key and not settings.supabase_service_role_key


def decode_supabase_token(token: str) -> dict[str, Any]:
    if not token:
        raise ValueError("Missing bearer token")
    if is_offline_mode():
        return demo_user()

    secret = settings.supabase_anon_key or settings.supabase_service_role_key
    if not secret:
        raise ValueError("Supabase keys are not configured")

    options: dict[str, Any] = {"require": ["sub", "exp"], "verify_aud": False}
    issuer = settings.supabase_jwt_issuer or settings.supabase_url
    payload = jwt.decode(
        token,
        secret,
        algorithms=["HS256"],
        issuer=issuer,
        options=options,
    )

    if not payload.get("sub"):
        raise ValueError("JWT is missing subject")

    return {
        "id": payload.get("sub"),
        "email": payload.get("email") or f"{payload.get('sub')}@supabase.local",
        "full_name": payload.get("full_name") or "Supabase User",
        "role": payload.get("role", "member"),
    }


def current_timestamp() -> datetime:
    return datetime.now(timezone.utc)
