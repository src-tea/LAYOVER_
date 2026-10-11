import { CalendarClock, BriefcaseBusiness, Users, MapPin } from 'lucide-react';

const airportOptions = ['Delhi', 'Kochi', 'Mumbai', 'Bengaluru', 'Dubai', 'Singapore'];
const baggageOptions = ['Carry-on', 'Checked', 'Oversized', 'Any'];
const interestOptions = ['food', 'sightseeing', 'shopping', 'culture'];

export default function LayoverForm({ values, onChange, onSubmit, errors = {}, isLoading = false }) {
  const handleField = (event) => {
    const { name, value, type, checked } = event.target;
    onChange({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const toggleInterest = (interest) => {
    const current = values.interests || [];
    const next = current.includes(interest)
      ? current.filter((item) => item !== interest)
      : [...current, interest];

    onChange({ ...values, interests: next });
  };

  return (
    <form className="layover-form" onSubmit={(event) => { event.preventDefault(); onSubmit(values); }}>
      <div className="form-grid">
        <label className="field">
          <span>Airport</span>
          <select name="airport" value={values.airport || ''} onChange={handleField}>
            <option value="">Select airport</option>
            {airportOptions.map((airport) => (
              <option key={airport} value={airport}>{airport}</option>
            ))}
          </select>
          {errors.airport ? <small className="error-text">{errors.airport}</small> : null}
        </label>

        <label className="field">
          <span>Arrival date & time</span>
          <input type="datetime-local" name="arrival" value={values.arrival || ''} onChange={handleField} />
          {errors.arrival ? <small className="error-text">{errors.arrival}</small> : null}
        </label>

        <label className="field">
          <span>Next flight departure</span>
          <input type="datetime-local" name="departure" value={values.departure || ''} onChange={handleField} />
          {errors.departure ? <small className="error-text">{errors.departure}</small> : null}
        </label>

        <label className="field">
          <span>Number of bags</span>
          <input type="number" min="1" max="6" name="bags" value={values.bags || 1} onChange={handleField} />
          {errors.bags ? <small className="error-text">{errors.bags}</small> : null}
        </label>

        <label className="field">
          <span>Baggage size</span>
          <select name="baggage" value={values.baggage || 'Carry-on'} onChange={handleField}>
            {baggageOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.baggage ? <small className="error-text">{errors.baggage}</small> : null}
        </label>

        <label className="field">
          <span>Max storage budget / person</span>
          <input type="number" min="100" name="budget" value={values.budget || 450} onChange={handleField} />
          {errors.budget ? <small className="error-text">{errors.budget}</small> : null}
        </label>
      </div>

      <div className="toggle-row">
        <label className="checkbox-row">
          <input type="checkbox" name="companion" checked={Boolean(values.companion)} onChange={handleField} />
          <span>Open to exploring with a companion</span>
        </label>
      </div>

      <div className="interest-selector">
        {interestOptions.map((interest) => (
          <button
            key={interest}
            type="button"
            className={`chip ${((values.interests || []).includes(interest) ? 'selected' : '')}`}
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </button>
        ))}
      </div>

      <div className="summary-card">
        <div className="mini-stat">
          <MapPin size={16} />
          <span>{values.airport || 'Select airport'}</span>
        </div>
        <div className="mini-stat">
          <CalendarClock size={16} />
          <span>{values.arrival ? new Date(values.arrival).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Arrival time'}</span>
        </div>
        <div className="mini-stat">
          <Users size={16} />
          <span>{values.bags || 1} bag(s)</span>
        </div>
        <div className="mini-stat">
          <BriefcaseBusiness size={16} />
          <span>{values.baggage || 'Carry-on'}</span>
        </div>
      </div>

      <button className="btn btn-primary form-submit" type="submit" disabled={isLoading}>
        {isLoading ? 'Matching travellers…' : 'Find a match'}
      </button>
    </form>
  );
}
