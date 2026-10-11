export function calculateSharedCost({ totalPrice = 0, eligibleParticipants = 1, soloPrice = 0, platformFee = 0 }) {
  const total = Number(totalPrice || 0);
  const eligibleCount = Math.max(1, Number(eligibleParticipants || 1));
  const fee = Number(platformFee || 0);
  const perParticipant = total / eligibleCount;
  const finalTotal = perParticipant + fee;
  const savings = Number(soloPrice || total) - finalTotal;

  return {
    total,
    perParticipant: Number(perParticipant.toFixed(2)),
    savings: Number(savings.toFixed(2)),
    eligibleCount,
    fee,
    finalTotal: Number(finalTotal.toFixed(2)),
    platformFee: fee,
  };
}
