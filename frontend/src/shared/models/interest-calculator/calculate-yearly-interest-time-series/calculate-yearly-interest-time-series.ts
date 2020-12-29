import { roundNumber } from '../../../utils/round-number/round-number';

export interface YearlyInterestTimeSeries {
  year: number;
  yearlyInterest: number;
}

export function calculateYearlyInterestTimeSeries(
  series: {
    totalInterest: number;
  }[],
) {
  return series.map((value, index, array) => {
    if (index == 0) {
      return { yearlyInterest: 0, year: 0 };
    }
    return {
      year: index,
      yearlyInterest: roundNumber(
        value.totalInterest - array[index - 1].totalInterest,
      ),
    };
  });
}
