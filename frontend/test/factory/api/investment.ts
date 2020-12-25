import { FactoryBuilder } from 'factory.io';
import * as faker from 'faker';
import {
  InvestmentResponseDto,
  SaveInvestmentDto,
} from '../../../src/core/api/api.interface';
import { investmentConfigFactory } from '../investment/investment';
import { INVESTMENT_CATEGORIES } from '../../../src/shared/constants/investment-category';

export const saveInvestmentRequestFactory = FactoryBuilder.of<SaveInvestmentDto>()
  .mixins([investmentConfigFactory])
  .props({
    category: () =>
      faker.random.arrayElement(Object.values(INVESTMENT_CATEGORIES)),
  })
  .build();

export const investmentResponseFactory = FactoryBuilder.of<InvestmentResponseDto>()
  .options({ sequenceField: 'id' })
  .mixins([saveInvestmentRequestFactory])
  .build();
