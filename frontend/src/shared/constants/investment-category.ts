export const INVESTMENT_CATEGORIES = {
  CERTIFICATE_OF_DEPOSIT: 'CERTIFICATE_OF_DEPOSIT',
  GOVERNMENT_BOND_FUNDS: 'GOVERNMENT_BOND_FUNDS',
  MONEY_MARKET_ACCOUNT: 'MONEY_MARKET_ACCOUNT',
  RENTAL_HOUSING: 'RENTAL_HOUSING',
  SAVINGS_ACCOUNT: 'SAVINGS_ACCOUNT',
  STOCK_FUND: 'STOCK_FUND',
  TREASURY_SECURITIES: 'TREASURY_SECURITIES',
  OTHER: 'OTHER',
} as const;

export type InvestmentCategories = keyof typeof INVESTMENT_CATEGORIES;

export const INVESTMENT_CATEGORIES_TRANSLATIONS = {
  CERTIFICATE_OF_DEPOSIT: 'Certificate of deposit',
  GOVERNMENT_BOND_FUNDS: 'Government bond funds',
  MONEY_MARKET_ACCOUNT: 'Money market account',
  RENTAL_HOUSING: 'Rental housing',
  SAVINGS_ACCOUNT: 'Savings account',
  STOCK_FUND: 'Stock fund',
  TREASURY_SECURITIES: 'Treasury securities',
  OTHER: 'Other',
} as const;

export const INVESTMENT_ENTRIES = (Object.keys(
  INVESTMENT_CATEGORIES,
) as InvestmentCategories[]).map((val) => ({
  value: val,
  label: INVESTMENT_CATEGORIES_TRANSLATIONS[val],
}));
