export interface FinancialImpact {
  estimatedTurnoverRate: number;
  estimatedDepartures: number;
  costPerDeparture: number;
  annualCost: number;
  behaveraCostYearly: number;
  savingsIf3pctReduction: number;
  roi: number;
}

export function calculateFinancialImpact(
  employees: number,
  fluktuaceScore: number,
  avgSalary: number = 50000
): FinancialImpact {
  let estimatedTurnoverRate: number;
  if (fluktuaceScore <= 25) estimatedTurnoverRate = 0.07;
  else if (fluktuaceScore <= 50) estimatedTurnoverRate = 0.12;
  else if (fluktuaceScore <= 75) estimatedTurnoverRate = 0.18;
  else estimatedTurnoverRate = 0.25;

  const estimatedDepartures = Math.round(employees * estimatedTurnoverRate);
  const costPerDeparture = avgSalary * 7.5;
  const annualCost = estimatedDepartures * costPerDeparture;
  const behaveraCostYearly = employees * 99 * 12;
  const savingsIf3pctReduction =
    Math.round(employees * 0.03) * costPerDeparture;
  const roi = Math.round(
    ((savingsIf3pctReduction - behaveraCostYearly) / behaveraCostYearly) * 100
  );

  return {
    estimatedTurnoverRate,
    estimatedDepartures,
    costPerDeparture,
    annualCost,
    behaveraCostYearly,
    savingsIf3pctReduction,
    roi: Math.max(roi, 0),
  };
}

export function formatCZK(amount: number): string {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
