import { roundNumber } from './round-number';

describe('roundNumber', () => {
  it.each([
    [1.111111111, 1.11],
    [1.00001, 1],
    [9.99999999, 10],
  ])(
    'should round %f to two decimal points (%f)',
    (input: number, expectedResult: number) => {
      const actualResult = roundNumber(input);

      expect(actualResult).toBe(expectedResult);
    },
  );
});
