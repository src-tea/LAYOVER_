export default function PriceBreakdown({ totalPrice, eligibleParticipants, soloPrice, platformFee = 0 }) {
  const perParticipant = eligibleParticipants > 0 ? totalPrice / eligibleParticipants : 0;
  const savings = soloPrice - perParticipant;

  return (
    <div className="price-breakdown card-panel">
      <h3>Price breakdown</h3>
      <div className="price-row"><span>Total sample storage</span><strong>₹{totalPrice}</strong></div>
      <div className="price-row"><span>Eligible participants</span><strong>{eligibleParticipants}</strong></div>
      <div className="price-row"><span>Demo platform fee</span><strong>₹{platformFee}</strong></div>
      <div className="price-row"><span>Per traveller</span><strong>₹{Math.round(perParticipant)}</strong></div>
      <div className="price-row"><span>Original solo price</span><strong>₹{soloPrice}</strong></div>
      <div className="price-row"><span>Estimated savings</span><strong>₹{Math.round(savings)}</strong></div>
    </div>
  );
}
