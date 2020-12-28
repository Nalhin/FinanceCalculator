import { FactoryBuilder } from 'factory.io';
import {
  BasketResponseDto,
  SaveBasketRequestDto,
  UpdateBasketRequestDto,
} from '../../../src/core/api/api.types';
import * as faker from 'faker';

export const basketResponseFactory = FactoryBuilder.of<BasketResponseDto>()
  .options({ sequenceField: 'id' })
  .props({
    createdDate: () => faker.date.recent().toISOString(),
    name: faker.random.word,
    description: faker.random.word,
  })
  .build();

export const saveBasketRequestFactory = FactoryBuilder.of<SaveBasketRequestDto>()
  .props({
    name: faker.random.word,
    description: faker.random.word,
  })
  .build();

export const updateBasketRequestFactory = FactoryBuilder.of<UpdateBasketRequestDto>()
  .mixins([saveBasketRequestFactory])
  .build();
