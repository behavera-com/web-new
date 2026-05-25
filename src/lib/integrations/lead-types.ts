export type CalculatorPayload = {
  positions?: number;
  timeToHireDays?: number;
  estimatedAnnualCostCzk?: number;
  estimatedAnnualSavingCzk?: number;
};

export type ConsultPayload = {
  employees?: number;
  hiresPerYear?: number;
  message?: string;
};

export type LeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  employees?: number;
  scores?: Array<{ label: string; score: number }>;
  overallScore?: number;
  source?: string;
  calculator?: CalculatorPayload;
  consult?: ConsultPayload;
};
