import {
  CompoundInterestRateCalculator,
  InvestmentConfig,
} from './compound-interest-rate-calculator';
import { roundNumber } from '../../utils/round-number/round-number';

export interface CompoundInterestTimeSeries {
  totalInterest: number;
  futureValue: number;
  totalPayments: number;
  index: number;
}

export function calculateCompoundInterestTimeSeries(
  investmentConfig: InvestmentConfig,
): CompoundInterestTimeSeries[] {
  if (investmentConfig.yearsOfGrowth < 0) {
    return [];
  }
  return new Array(investmentConfig.yearsOfGrowth + 1)
    .fill(0)
    .map((_, index) => {
      const curr = new CompoundInterestRateCalculator({
        ...investmentConfig,
        yearsOfGrowth: index,
      });
      return {
        totalInterest: roundNumber(curr.totalInterest),
        totalPayments: roundNumber(curr.totalPayments),
        futureValue: roundNumber(curr.futureValue),
        index,
      };
    });
}
