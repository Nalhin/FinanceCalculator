import { investmentConfigFactory } from '../../../../../test/factory/investment/investment';
import { calculateYearlyInvestmentSummary } from './calculate-yearly-investment-summary';

describe('calculateYearlyInvestmentSummary()', () => {
  it('should calculate yearly values', () => {
    const investmentConfig = {
      startAmount: 1000,
      annualInterestRate: 5,
      yearsOfGrowth: 5,
      payment: 0,
      paymentFrequency: 1,
      compoundFrequency: 2,
    };

    const actualSummary = calculateYearlyInvestmentSummary(investmentConfig);

    expect(actualSummary.yearlyInterest).toBe(50.625);
    expect(actualSummary.yearlyPercentageInterest).toBeCloseTo(5.065, 2);
  });

  it('should return empty summary when years of growth is 0', () => {
    const investmentConfig = investmentConfigFactory.buildOne({
      yearsOfGrowth: 0,
    });

    const actualSummary = calculateYearlyInvestmentSummary(investmentConfig);

    expect(actualSummary).toStrictEqual({
      yearlyInterest: 0,
      yearlyPercentageInterest: 0,
    });
  });
});
