from __future__ import annotations


def estimate_storage_quote(facility: dict, requested_users: int = 1, group_size: int = 1) -> dict:
    base_price = float(facility.get("base_price", 0.0) or 0.0)
    sharing_allowed = bool(facility.get("sharing_allowed", False))
    share_min = int(facility.get("share_min_users", 1) or 1)
    share_max = int(facility.get("share_max_users", 1) or 1)
    effective_group = max(1, int(group_size or requested_users or 1))

    if sharing_allowed and effective_group >= share_min and effective_group <= share_max:
        per_person_price = round(base_price / effective_group, 2)
        savings_percent = round(max(0.0, (1.0 - (per_person_price / base_price)) * 100.0), 2) if base_price > 0 else 0.0
        return {
            "solo_price": round(base_price, 2),
            "per_person_price": per_person_price,
            "total_shared_price": round(base_price, 2),
            "savings_percent": savings_percent,
            "sharing_allowed": True,
            "group_size": effective_group,
            "currency": facility.get("currency", "USD"),
        }

    return {
        "solo_price": round(base_price, 2),
        "per_person_price": round(base_price, 2),
        "total_shared_price": round(base_price, 2),
        "savings_percent": 0.0,
        "sharing_allowed": False,
        "group_size": effective_group,
        "currency": facility.get("currency", "USD"),
    }
