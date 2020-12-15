import {
  AuthenticatedUser,
  UserProperties,
} from '../../../src/shared/models/user/user';
import { FactoryBuilder } from 'factory.io';
import * as faker from 'faker';

export const userPropertiesFactory = FactoryBuilder.of<UserProperties>()
  .props({
    username: faker.internet.userName,
    email: faker.internet.email,
  })
  .build();

export const authenticatedUserFactory = FactoryBuilder.of(AuthenticatedUser)
  .ctor([userPropertiesFactory.buildOne])
  .build();
