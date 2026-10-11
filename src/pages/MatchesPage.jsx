import { Filter, Sparkles } from 'lucide-react';
import MatchCard from '../components/MatchCard';
import EmptyState from '../components/EmptyState';
import { findMatches, sortMatches } from '../utils/matching';
import { travellers } from '../data/travellers';

export default function MatchesPage({ search, onViewMatch, onConnect, onReset }) {
  const allMatches = sortMatches(findMatches(search, travellers), search);

  if (!allMatches.length) {
    return (
      <main className="page-shell narrow-shell">
        <EmptyState
          title="No compatible travellers found"
          message="Your layover rules are strict, or the airport window is too tight for a shared booking. Try changing your search criteria or switch to a solo-storage path."
          action={{ label: 'Adjust search', onClick: onReset }}
        />
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="container">
        <div className="section-heading inline-heading">
          <div>
            <span className="eyebrow">Find a match</span>
            <h2>People who fit your layover</h2>
          </div>
          <div className="filter-pill"><Filter size={14} /> Sorted by best schedule match</div>
        </div>

        <div className="toolbar-row">
          <span className="muted"><Sparkles size={14} /> Compatibility estimates based on demo data</span>
        </div>

        <div className="results-grid">
          {allMatches.map((traveller) => (
            <MatchCard
              key={traveller.id}
              traveller={traveller}
              onView={() => onViewMatch(traveller)}
              onConnect={() => onConnect(traveller)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
