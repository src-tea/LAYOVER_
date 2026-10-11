import { MapPin, Clock3, Tag, Plus } from 'lucide-react';
import { attractions } from '../data/attractions';

export default function ExplorePage({ onAddActivity }) {
  return (
    <main className="page-shell">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Explore the city</span>
          <h2>Illustrative sample activities</h2>
        </div>

        <div className="results-grid attraction-grid">
          {attractions.map((place) => (
            <article key={place.id} className="card-panel attraction-card">
              <div className="attraction-visual">{place.name.charAt(0)}</div>
              <div className="attraction-content">
                <div className="attraction-header">
                  <h3>{place.name}</h3>
                  <span className="tag">{place.category}</span>
                </div>
                <div className="meta-grid compact-grid">
                  <span><Clock3 size={14} /> {place.duration}</span>
                  <span><MapPin size={14} /> {place.travelTime}</span>
                  <span><Tag size={14} /> ₹{place.price}</span>
                </div>
                <p>{place.window}</p>
                <button className="btn btn-primary small" type="button" onClick={() => onAddActivity(place)}>
                  <Plus size={14} /> Add to Itinerary
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
