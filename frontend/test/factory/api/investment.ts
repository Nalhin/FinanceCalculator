import { FactoryBuilder } from 'factory.io';
import * as faker from 'faker';
import {
  InvestmentResponseDto,
  SaveInvestmentDto,
} from '../../../src/core/api/api.interface';
import { investmentConfigFactory } from '../investment/investment';

export const saveInvestmentRequestFactory = FactoryBuilder.of<SaveInvestmentDto>()
  .mixins([investmentConfigFactory])
  .props({
    category: faker.random.word,
    risk: faker.random.word,
  })
  .build();

export const investmentResponseFactory = FactoryBuilder.of<InvestmentResponseDto>()
  .options({ sequenceField: 'id' })
  .mixins([saveInvestmentRequestFactory])
  .build();
