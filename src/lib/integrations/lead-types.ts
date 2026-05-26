export type AiMaturity = "none" | "pilot" | "production";

export type ConsultPayload = {
  employees?: number;
  hiresPerYear?: number;
  aiMaturity?: AiMaturity;
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
  consult?: ConsultPayload;
  event_id?: string;
};
