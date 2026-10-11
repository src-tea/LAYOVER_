function normalize(value) {
  return String(value || '').toLowerCase();
}

function overlapInMinutes(startA, endA, startB, endB) {
  const aStart = new Date(startA).getTime();
  const aEnd = new Date(endA).getTime();
  const bStart = new Date(startB).getTime();
  const bEnd = new Date(endB).getTime();

  if (Number.isNaN(aStart) || Number.isNaN(aEnd) || Number.isNaN(bStart) || Number.isNaN(bEnd)) {
    return 0;
  }

  const overlapStart = Math.max(aStart, bStart);
  const overlapEnd = Math.min(aEnd, bEnd);

  return Math.max(0, Math.round((overlapEnd - overlapStart) / 60000));
}

function baggageMatches(searchBaggage, travellerBaggage) {
  if (!searchBaggage || !travellerBaggage) return true;
  if (normalize(searchBaggage) === 'any' || normalize(travellerBaggage) === 'any') return true;
  return normalize(searchBaggage) === normalize(travellerBaggage);
}

export function findMatches(search, travellers = []) {
  if (!search || !Array.isArray(travellers)) return [];

  const searchStart = new Date(search.arrival);
  const searchEnd = new Date(search.departure);

  if (Number.isNaN(searchStart.getTime()) || Number.isNaN(searchEnd.getTime()) || searchEnd <= searchStart) {
    return [];
  }

  const searchBudget = Number(search.budget || 0);
  const selectedInterests = (search.interests || []).map((item) => normalize(item));

  return travellers
    .filter((traveller) => normalize(traveller.airport) === normalize(search.airport))
    .filter((traveller) => {
      const travellerStart = new Date(traveller.arrival);
      const travellerEnd = new Date(traveller.departure);
      return overlapInMinutes(searchStart, searchEnd, travellerStart, travellerEnd) > 0;
    })
    .filter((traveller) => baggageMatches(search.baggage, traveller.baggage))
    .filter((traveller) => Number(traveller.budget || 0) >= Math.min(searchBudget, 300))
    .map((traveller) => {
      const overlapMinutes = overlapInMinutes(search.arrival, search.departure, traveller.arrival, traveller.departure);
      const sharedInterestCount = (traveller.interests || []).filter((interest) => selectedInterests.includes(normalize(interest))).length;
      const baseScore = Math.min(99, 60 + overlapMinutes / 3 + sharedInterestCount * 10 + (traveller.sharedStorage ? 8 : 0));
      const budgetDelta = Math.abs(Number(traveller.budget || 0) - searchBudget);
      const adjustedScore = Math.max(55, Math.min(99, Math.round(baseScore - budgetDelta / 12)));

      return {
        ...traveller,
        overlapMinutes,
        score: adjustedScore,
        cost: Math.min(400, Math.max(180, Math.round(searchBudget * 0.45))),
      };
    })
    .sort((a, b) => b.score - a.score || b.overlapMinutes - a.overlapMinutes);
}

export function sortMatches(matches = []) {
  return [...matches].sort((a, b) => b.score - a.score || b.overlapMinutes - a.overlapMinutes);
}
