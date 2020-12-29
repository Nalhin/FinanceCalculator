import { investmentConfigFactory } from '../../../../../test/factory/investment/investment';
import { calculateCompoundInterestTimeSeries } from './compound-interest-time-series';

describe('compoundInterestTimeSeries function', () => {
  it('should have length equal to years of growth + 1', () => {
    const investmentConfig = investmentConfigFactory.buildOne({
      yearsOfGrowth: 5,
    });

    const actualResult = calculateCompoundInterestTimeSeries(investmentConfig);

    expect(actualResult).toHaveLength(6);
  });

  it('should return an empty array when years of growth is negative', () => {
    const investmentConfig = investmentConfigFactory.buildOne({
      yearsOfGrowth: -1,
    });

    const actualResult = calculateCompoundInterestTimeSeries(investmentConfig);

    expect(actualResult).toHaveLength(0);
  });

  it('should calculate correct series values', () => {
    const investmentConfig = {
      startAmount: 1000,
      annualInterestRate: 5,
      yearsOfGrowth: 1,
      payment: 2500,
      paymentFrequency: 1,
      compoundFrequency: 1,
    };

    const actualResult = calculateCompoundInterestTimeSeries(investmentConfig);

    expect(actualResult).toEqual([
      {
        futureValue: 1000,
        year: 0,
        totalInterest: 0,
        totalPayments: 0,
      },
      {
        year: 1,
        futureValue: 3550,
        totalInterest: 50,
        totalPayments: 2500,
      },
    ]);
  });
});
