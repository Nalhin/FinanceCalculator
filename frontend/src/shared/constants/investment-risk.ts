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
  LOW: '#38A169',
  MEDIUM: '#ECC94B',
  HIGH: '#E53E3E',
  UNKNOWN: '#718096',
} as const;

export const INVESTMENT_RISK_SCHEME_COLORS = {
  LOW: 'green',
  MEDIUM: 'yellow',
  HIGH: 'red',
  UNKNOWN: 'gray',
} as const;
