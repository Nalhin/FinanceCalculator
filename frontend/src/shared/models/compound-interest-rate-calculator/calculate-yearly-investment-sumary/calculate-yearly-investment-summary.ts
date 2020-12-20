import {
  CompoundInterestRateCalculator,
  InvestmentConfig,
} from '../compound-interest-rate-calculator/compound-interest-rate-calculator';

export function calculateYearlyInvestmentSummary(config: InvestmentConfig) {
  const yearlyCalculator = new CompoundInterestRateCalculator({
    ...config,
    yearsOfGrowth: config.yearsOfGrowth ? 1 : 0,
  });
  return {
    yearlyInterest: yearlyCalculator.totalInterest,
    yearlyPercentageInterest: yearlyCalculator.percentageInterest,
  };
}
