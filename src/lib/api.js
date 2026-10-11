const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8001/api';

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export function toIsoDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function normalizeLayoverToTraveller(layover, index = 0) {
  const arrival = layover.arrival_time || layover.arrival || new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString();
  const departure = layover.departure_time || layover.departure || new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString();

  return {
    id: layover.id || `api-traveller-${index}`,
    name: layover.full_name || layover.user_name || `Traveller ${index + 1}`,
    airport: layover.airport_code || layover.airport || 'DXB',
    arrival,
    departure,
    baggage: layover.baggage_size || layover.baggage || 'Carry-on',
    budget: layover.budget || 450,
    interests: layover.interests || [],
    sharedStorage: true,
    score: 0,
  };
}
