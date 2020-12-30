import { roundNumber } from '../round-number/round-number';

export interface YearlyPaymentsTimeSeries {
  year: number;
  yearlyPayments: number;
}

export function calculateYearlyPaymentsTimeSeries(
  series: {
    totalPayments: number;
  }[],
): YearlyPaymentsTimeSeries[] {
  return series.map((value, index, array) => {
    if (index === 0) {
      return { yearlyPayments: 0, year: 0 };
    }
    return {
      year: index,
      yearlyPayments: roundNumber(
        value.totalPayments - array[index - 1].totalPayments,
      ),
    };
  });
}
