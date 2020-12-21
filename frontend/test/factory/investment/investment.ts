import { FactoryBuilder } from 'factory.io';
import { InvestmentConfig } from '../../../src/shared/models/interest-calculator/compound-interest-rate-calculator/compound-interest-rate-calculator';
import * as faker from 'faker';

export const investmentConfigFactory = FactoryBuilder.of<InvestmentConfig>()
  .props({
    startAmount: () => faker.random.number({ min: 1, max: 10000 }),
    annualInterestRate: () => faker.random.number({ min: 1, max: 15 }),
    yearsOfGrowth: () => faker.random.number({ min: 1, max: 15 }),
    payment: () => faker.random.number({ min: 1, max: 100000 }),
    paymentFrequency: 1,
    compoundFrequency: 1,
  })
  .build();
