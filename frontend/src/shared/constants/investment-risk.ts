export const INVESTMENT_RISK = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  UNKNOWN: 'UNKNOWN',
} as const;

export type InvestmentRisk = keyof typeof INVESTMENT_RISK;

export const INVESTMENT_RISK_TRANSLATIONS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  UNKNOWN: 'Unknown',
} as const;

export const INVESTMENT_RISK_COLORS = {
  LOW: 'green',
  MEDIUM: 'yellow',
  HIGH: 'red',
  UNKNOWN: 'gray',
} as const;
