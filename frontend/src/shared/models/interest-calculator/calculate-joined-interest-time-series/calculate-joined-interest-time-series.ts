import { InvestmentConfig } from '../compound-interest-rate-calculator/compound-interest-rate-calculator';
import {
  CompoundInterestTimeSeries,
  calculateCompoundInterestTimeSeries,
} from '../calculate-compound-interest-time-series/compound-interest-time-series';
import { roundNumber } from '../../../utils/round-number/round-number';

export function calculateJoinedInterestTimeSeries(
  investments: InvestmentConfig[],
): CompoundInterestTimeSeries[] {
  const investmentsTimeSeries = investments.map((investment) =>
    calculateCompoundInterestTimeSeries(investment),
  );

  const maxLen = Math.max(...investmentsTimeSeries.map((el) => el.length));

  if (maxLen <= 0) {
    return [];
  }

  const result = Array(maxLen)
    .fill(0)
    .map((_, index) => ({
      totalInterest: 0,
      futureValue: 0,
      totalPayments: 0,
      year: index,
    }));

  investmentsTimeSeries.forEach((item) => {
    for (let i = 0; i < maxLen; i++) {
      const curr = i >= item.length ? item[item.length - 1] : item[i];
      result[i].futureValue = roundNumber(
        Number(result[i].futureValue) + Number(curr.futureValue),
      );
      result[i].totalPayments = roundNumber(
        Number(result[i].totalPayments) + Number(curr.totalPayments),
      );
      result[i].totalInterest = roundNumber(
        Number(result[i].totalInterest) + Number(curr.totalInterest),
      );
    }
  });

  return result;
}
