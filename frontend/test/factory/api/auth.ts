import { FactoryBuilder } from 'factory.io';
import { AuthResponseDto } from '../../../src/core/api/api.interface';
import { userResponseFactory } from './me';
import * as faker from 'faker';

export const authResponseFactory = FactoryBuilder.of<AuthResponseDto>()
  .props({
    user: userResponseFactory.buildOne,
    token: faker.random.word,
  })
  .build();
