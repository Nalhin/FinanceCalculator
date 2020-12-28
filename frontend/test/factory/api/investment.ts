import { FactoryBuilder } from 'factory.io';
import * as faker from 'faker';
import {
  InvestmentResponseDto,
  SaveInvestmentRequestDto,
  UpdateInvestmentRequestDto,
} from '../../../src/core/api/api.types';
import { investmentConfigFactory } from '../investment/investment';
import { INVESTMENT_CATEGORIES } from '../../../src/shared/constants/investment-category';

export const saveInvestmentRequestFactory = FactoryBuilder.of<SaveInvestmentRequestDto>()
  .mixins([investmentConfigFactory])
  .props({
    category: () =>
      faker.random.arrayElement(Object.values(INVESTMENT_CATEGORIES)),
  })
  .build();

export const updateInvestmentRequestFactory = FactoryBuilder.of<UpdateInvestmentRequestDto>()
  .mixins([saveInvestmentRequestFactory])
  .build();

export const investmentResponseFactory = FactoryBuilder.of<InvestmentResponseDto>()
  .options({ sequenceField: 'id' })
  .props({
    createdDate: () => faker.date.recent().toISOString(),
  })
  .mixins([saveInvestmentRequestFactory])
  .build();
