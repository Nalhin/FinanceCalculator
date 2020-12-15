import { FactoryBuilder } from 'factory.io';
import { UserResponseDto } from '../../../src/core/api/api.interface';
import * as faker from 'faker';

export const userResponseFactory = FactoryBuilder.of<UserResponseDto>()
  .props({
    username: faker.internet.userName,
    email: faker.internet.email,
  })
  .build();
