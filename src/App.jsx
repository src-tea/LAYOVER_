import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import MatchesPage from './pages/MatchesPage';
import MatchDetailsPage from './pages/MatchDetailsPage';
import StoragePage from './pages/StoragePage';
import ExplorePage from './pages/ExplorePage';
import ItineraryPage from './pages/ItineraryPage';
import TripsPage from './pages/TripsPage';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import { travellers } from './data/travellers';
import { storageFacilities } from './data/storage';
import { readStorage, writeStorage } from './utils/storage';
import { findMatches } from './utils/matching';
import { apiFetch, normalizeLayoverToTraveller, toIsoDate } from './lib/api';

const defaultSearch = {
  airport: 'Delhi',
  arrival: '2026-10-10T08:00',
  departure: '2026-10-10T14:00',
  bags: 1,
  baggage: 'Carry-on',
  budget: 450,
  companion: true,
  interests: ['food', 'sightseeing'],
};

export default function App() {
  const navigate = useNavigate();
  const [search, setSearch] = useState(() => readStorage('layover-search', defaultSearch));
  const [selectedMatch, setSelectedMatch] = useState(() => readStorage('layover-selected-match', travellers[0]));
  const [selectedStorage, setSelectedStorage] = useState(() => readStorage('layover-selected-storage', storageFacilities[0]));
  const [bookings, setBookings] = useState(() => readStorage('layover-bookings', []));
  const [connections, setConnections] = useState(() => readStorage('layover-connections', []));
  const [itineraryActivities, setItineraryActivities] = useState(() => readStorage('layover-itinerary', []));
  const [backendTravellers, setBackendTravellers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    async function loadBackendTravellers() {
      try {
        const response = await apiFetch('/layovers');
        const items = Array.isArray(response?.items) ? response.items : [];
        setBackendTravellers(items.map((item, index) => normalizeLayoverToTraveller(item, index)));
      } catch (error) {
        console.info('Backend not available, using local demo data:', error.message);
        setBackendTravellers([]);
      }
    }

    loadBackendTravellers();
  }, []);

  const matches = useMemo(() => {
    const activeTravellers = backendTravellers.length ? backendTravellers : travellers;
    return findMatches(search, activeTravellers);
  }, [backendTravellers, search]);

  useEffect(() => {
    writeStorage('layover-search', search);
  }, [search]);

  useEffect(() => {
    writeStorage('layover-selected-match', selectedMatch);
  }, [selectedMatch]);

  useEffect(() => {
    writeStorage('layover-selected-storage', selectedStorage);
  }, [selectedStorage]);

  useEffect(() => {
    writeStorage('layover-bookings', bookings);
  }, [bookings]);

  useEffect(() => {
    writeStorage('layover-connections', connections);
  }, [connections]);

  useEffect(() => {
    writeStorage('layover-itinerary', itineraryActivities);
  }, [itineraryActivities]);

  function validateSearch(values) {
    const errors = {};

    if (!values.airport) errors.airport = 'Please choose an airport.';
    if (!values.arrival) errors.arrival = 'Arrival time is required.';
    if (!values.departure) errors.departure = 'Departure time is required.';
    if (values.arrival && values.departure && new Date(values.departure) <= new Date(values.arrival)) {
      errors.departure = 'Departure must be later than arrival.';
    }
    if (!values.bags || Number(values.bags) < 1) errors.bags = 'At least one bag is required.';
    if (!values.budget || Number(values.budget) < 100) errors.budget = 'Set a realistic maximum budget.';

    return errors;
  }

  async function handleSearchSubmit(values) {
    const errors = validateSearch(values);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSearching(true);

    try {
      const payload = {
        airport_code: values.airport,
        arrival_time: toIsoDate(values.arrival),
        departure_time: toIsoDate(values.departure),
        baggage_size: (values.baggage || 'Carry-on').toLowerCase(),
        interests: values.interests || [],
      };

      const createdLayover = await apiFetch('/layovers', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (createdLayover?.item) {
        setBackendTravellers((current) => [normalizeLayoverToTraveller(createdLayover.item, current.length), ...current]);
      }
    } catch (error) {
      console.info('API create failed, falling back to local demo state:', error.message);
    }

    setSearch(values);
    setIsSearching(false);
    navigate('/matches');
  }

  function handleViewMatch(match) {
    setSelectedMatch(match);
    navigate('/matches/' + match.id);
  }

  function handleConnect(match) {
    const entry = {
      id: match.id,
      name: match.name,
      airport: match.airport,
      status: 'Demo connection request sent',
      interests: match.interests || [],
    };

    setConnections((current) => {
      const exists = current.some((item) => item.id === entry.id);
      return exists ? current : [entry, ...current];
    });
  }

  function handleSelectStorage(facility) {
    setSelectedStorage(facility);
    navigate('/booking');
  }

  function handleConfirmBooking(booking) {
    setBookings((current) => [
      {
        ...booking,
        id: booking.ref || `booking-${Date.now()}`,
      },
      ...current,
    ]);
    navigate('/trips');
  }

  function handleCancelBooking(id) {
    setBookings((current) => current.filter((item) => item.id !== id));
  }

  function handleAddActivity(place) {
    setItineraryActivities((current) => {
      const exists = current.includes(place.id);
      return exists ? current : [...current, place.id];
    });
    navigate('/itinerary');
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              search={search}
              setSearch={setSearch}
              onSubmit={handleSearchSubmit}
              errors={formErrors}
              isLoading={isSearching}
            />
          }
        />
        <Route
          path="/buddy"
          element={
            <MatchesPage
              search={search}
              onViewMatch={handleViewMatch}
              onConnect={handleConnect}
              onReset={() => {
                setSearch(defaultSearch);
                navigate('/');
              }}
            />
          }
        />
        <Route
          path="/matches"
          element={
            <MatchesPage
              search={search}
              onViewMatch={handleViewMatch}
              onConnect={handleConnect}
              onReset={() => {
                setSearch(defaultSearch);
                navigate('/');
              }}
            />
          }
        />
        <Route
          path="/matches/:id"
          element={
            <MatchDetailsPage
              match={selectedMatch || matches[0] || null}
              search={search}
              onSelectStorage={() => handleSelectStorage(storageFacilities[0])}
              onConnect={handleConnect}
            />
          }
        />
        <Route path="/storage" element={<StoragePage onSelectStorage={handleSelectStorage} />} />
        <Route path="/explore" element={<ExplorePage onAddActivity={handleAddActivity} />} />
        <Route path="/itinerary" element={<ItineraryPage search={search} activities={itineraryActivities} />} />
        <Route path="/layover" element={<TripsPage bookings={bookings} onCancel={handleCancelBooking} />} />
        <Route path="/trips" element={<TripsPage bookings={bookings} onCancel={handleCancelBooking} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              search={search}
              selectedStorage={selectedStorage}
              selectedMatch={selectedMatch}
              onConfirmBooking={handleConfirmBooking}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
