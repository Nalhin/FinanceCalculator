import { CompoundInterestRateCalculator } from './compound-interest-rate-calculator';

describe('CompoundInterestRateCalculator Class', () => {
  describe('total payments', () => {
    it('should summarize total amount payed', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 0,
        annualInterestRate: 0,
        yearsOfGrowth: 5,
        payment: 100,
        paymentFrequency: 1,
        compoundFrequency: 1,
      });

      expect(calculator.totalPayments).toEqual(500);
    });

    it('should calculate totalPayments with quarterly paymentFrequency', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 0,
        annualInterestRate: 0,
        yearsOfGrowth: 5,
        payment: 100,
        paymentFrequency: 6,
        compoundFrequency: 1,
      });

      expect(calculator.totalPayments).toEqual(3000);
    });
  });

  describe('total interest', () => {
    it('should not overflow when yearsOfGrowth equals zero', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 0,
        yearsOfGrowth: 0,
        payment: 0,
        paymentFrequency: 0,
        compoundFrequency: 1,
      });

      expect(calculator.totalInterest).toEqual(0);
    });

    it('should not overflow when paymentFrequency equals zero', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 0,
        yearsOfGrowth: 5,
        payment: 0,
        paymentFrequency: 0,
        compoundFrequency: 1,
      });

      expect(calculator.totalInterest).toEqual(0);
    });

    it('should calculate totalInterest properly without payments', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 5,
        yearsOfGrowth: 5,
        payment: 0,
        paymentFrequency: 0,
        compoundFrequency: 1,
      });

      expect(calculator.totalInterest).toBeCloseTo(276.28, 2);
    });

    it('should calculate totalInterest with yearly payments', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 5,
        yearsOfGrowth: 5,
        payment: 100,
        paymentFrequency: 1,
        compoundFrequency: 1,
      });

      expect(calculator.totalInterest).toBeCloseTo(328.84, 2);
    });

    it('should calculate totalInterest with monthly payments', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 5,
        yearsOfGrowth: 5,
        payment: 100,
        paymentFrequency: 12,
        compoundFrequency: 1,
      });

      expect(calculator.totalInterest).toBeCloseTo(1057.66, 2);
    });
  });

  describe('future value', () => {
    it('should not overflow with zero yearsOfGrowth', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 0,
        yearsOfGrowth: 0,
        payment: 0,
        paymentFrequency: 0,
        compoundFrequency: 1,
      });

      expect(calculator.futureValue).toEqual(1000);
    });

    it('should not overflow when payment frequency equals zero', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 0,
        yearsOfGrowth: 5,
        payment: 0,
        paymentFrequency: 0,
        compoundFrequency: 1,
      });

      expect(calculator.futureValue).toEqual(1000);
    });

    it('should calculate FutureValue properly with yearly payments', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 0,
        yearsOfGrowth: 5,
        payment: 100,
        paymentFrequency: 1,
        compoundFrequency: 1,
      });

      expect(calculator.futureValue).toEqual(1500);
    });

    it('should calculate futureValue properly when no payments are provided', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 5,
        yearsOfGrowth: 5,
        payment: 0,
        paymentFrequency: 0,
        compoundFrequency: 1,
      });

      expect(calculator.futureValue).toBeCloseTo(1276.28, 2);
    });

    it('should calculate futureValue when yearly payments are provided', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 5,
        yearsOfGrowth: 5,
        payment: 100,
        paymentFrequency: 1,
        compoundFrequency: 1,
      });

      expect(calculator.futureValue).toBeCloseTo(1828.84, 2);
    });

    it('should calculate futureValue when monthly payments are provided', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 5,
        yearsOfGrowth: 5,
        payment: 100,
        paymentFrequency: 12,
        compoundFrequency: 1,
      });

      expect(calculator.futureValue).toBeCloseTo(8057.66, 2);
    });
  });

  describe('percentageInterest', () => {
    it('should not overflow when yearsOfGrowth equals zero', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 5,
        yearsOfGrowth: 0,
        payment: 100,
        paymentFrequency: 12,
        compoundFrequency: 1,
      });

      expect(calculator.percentageInterest).toEqual(0);
    });

    it('should display correct percentage interest rate', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 100,
        yearsOfGrowth: 1,
        payment: 0,
        paymentFrequency: 0,
        compoundFrequency: 1,
      });

      expect(calculator.percentageInterest).toEqual(100);
    });
  });

  describe('compoundFrequency', () => {
    it('should adjust for compound frequency changes', () => {
      const calculator = new CompoundInterestRateCalculator({
        startAmount: 1000,
        annualInterestRate: 100,
        yearsOfGrowth: 2,
        payment: 0,
        paymentFrequency: 0,
        compoundFrequency: 12,
      });

      expect(calculator.totalInterest).toBeCloseTo(5827.95, 2);
      expect(calculator.totalPayments).toEqual(0);
      expect(calculator.futureValue).toBeCloseTo(6827.95, 2);
    });
  });
});
