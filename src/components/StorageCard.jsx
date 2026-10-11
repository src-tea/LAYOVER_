import { Clock3, MapPin, ShieldCheck, Tag } from 'lucide-react';

export default function StorageCard({ facility, onSelect, selected = false }) {
  return (
    <article className={`storage-card ${selected ? 'selected' : ''}`}>
      <div className="storage-header">
        <div>
          <h3>{facility.name}</h3>
          <p><MapPin size={14} /> {facility.airport}</p>
        </div>
        <span className="price-tag">₹{facility.price}</span>
      </div>

      <div className="storage-meta">
        <span>Shared booking: {facility.sharedBooking ? 'Allowed' : 'Not permitted'}</span>
        <span>Hours: {facility.hours}</span>
        <span>Baggage: {facility.baggageTypes.join(', ')}</span>
        <span>Distance: {facility.distance}</span>
      </div>

      <div className="storage-detail-list">
        <div><Tag size={14} /> Min duration: {facility.minDuration}</div>
        <div><Clock3 size={14} /> Capacity: {facility.capacity}</div>
        <div><ShieldCheck size={14} /> Access: {facility.accessControl}</div>
      </div>

      <button className="btn btn-primary full" type="button" onClick={onSelect}>
        {selected ? 'Selected' : 'Select Storage'}
      </button>
    </article>
  );
}
