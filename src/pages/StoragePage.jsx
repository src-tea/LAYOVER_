import { useMemo, useState } from 'react';
import StorageCard from '../components/StorageCard';
import { storageFacilities } from '../data/storage';

export default function StoragePage({ onSelectStorage }) {
  const [filters, setFilters] = useState({ maxPrice: 900, sharedOnly: false, baggage: 'Any' });

  const filtered = useMemo(() => storageFacilities.filter((facility) => {
    const budgetMatch = facility.price <= filters.maxPrice;
    const baggageMatch = filters.baggage === 'Any' || facility.baggageTypes.includes(filters.baggage);
    const sharedMatch = !filters.sharedOnly || facility.sharedBooking;
    return budgetMatch && baggageMatch && sharedMatch;
  }), [filters]);

  return (
    <main className="page-shell">
      <div className="container">
        <div className="section-heading inline-heading">
          <div>
            <span className="eyebrow">Storage discovery</span>
            <h2>Sample facilities at your airport</h2>
          </div>
        </div>

        <div className="filter-panel card-panel">
          <label className="field inline-field">
            <span>Max price</span>
            <input type="range" min="200" max="1200" step="50" value={filters.maxPrice} onChange={(event) => setFilters({ ...filters, maxPrice: Number(event.target.value) })} />
            <strong>₹{filters.maxPrice}</strong>
          </label>

          <label className="field inline-field">
            <span>Baggage</span>
            <select value={filters.baggage} onChange={(event) => setFilters({ ...filters, baggage: event.target.value })}>
              <option>Any</option>
              <option>Carry-on</option>
              <option>Checked</option>
            </select>
          </label>

          <label className="checkbox-row">
            <input type="checkbox" checked={filters.sharedOnly} onChange={(event) => setFilters({ ...filters, sharedOnly: event.target.checked })} />
            <span>Only show shared-booking eligible</span>
          </label>
        </div>

        <div className="results-grid storage-grid">
          {filtered.map((facility) => (
            <StorageCard key={facility.id} facility={facility} onSelect={() => onSelectStorage(facility)} />
          ))}
        </div>
      </div>
    </main>
  );
}
