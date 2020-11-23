export interface InvestmentConfig {
  /**
   * Principal or Start Amount (P)
   */
  readonly startAmount: number;

  /**
   * Annual Interest Rate (r)
   */
  readonly annualInterestRate: number;

  /**
   * Years of Growth (t)
   */
  readonly yearsOfGrowth: number;

  /**
   * Payment (A)
   */
  readonly payment: number;

  /**
   * Payment Frequency (p)
   */
  readonly paymentFrequency: number;
  /**
   * Number of compounding periods per year
   */
  readonly compoundFrequency: number;
}

/*
  Formulas are based on https://www.vertex42.com/Calculators/compound-interest-calculator.html#rate-per-period
 */
export class CompoundInterestRateCalculator {
  private readonly startAmount: number;
  private readonly annualInterestRate: number;
  private readonly yearsOfGrowth: number;
  private readonly payment: number;
  private readonly paymentFrequency: number;
  private readonly compoundFrequency: number;

  constructor({
    startAmount,
    annualInterestRate,
    yearsOfGrowth,
    payment,
    paymentFrequency,
    compoundFrequency,
  }: InvestmentConfig) {
    this.startAmount = startAmount;
    this.annualInterestRate = annualInterestRate;
    this.yearsOfGrowth = yearsOfGrowth;
    this.payment = payment;
    this.paymentFrequency = Math.max(paymentFrequency, 1);
    this.compoundFrequency = compoundFrequency;
  }

  private get nominalAnnualInterestRate(): number {
    return this.annualInterestRate / 100;
  }

  private get rate(): number {
    return (
      (1 + this.nominalAnnualInterestRate / this.compoundFrequency) **
        (this.compoundFrequency / this.paymentFrequency) -
      1
    );
  }

  private get nper(): number {
    return this.paymentFrequency * this.yearsOfGrowth;
  }

  public get futureValue(): number {
    if (this.rate === 0) {
      return this.startAmount + this.payment * this.nper;
    }

    return (
      this.startAmount * (1 + this.rate) ** this.nper +
      this.payment * (((1 + this.rate) ** this.nper - 1) / this.rate)
    );
  }

  public get totalPayments() {
    return this.payment * this.nper;
  }

  public get totalInterest() {
    return this.futureValue - this.startAmount - this.totalPayments;
  }

  public get percentageInterest() {
    const denominator = this.startAmount + this.totalPayments;
    if (denominator === 0) {
      return 0;
    }
    return (this.futureValue / denominator - 1) * 100;
  }
}
