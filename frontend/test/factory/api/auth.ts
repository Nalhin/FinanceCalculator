import { FactoryBuilder } from 'factory.io';
import {
  AuthResponseDto,
  LoginUserRequestDto,
  SignUpUserRequestDto,
} from '../../../src/core/api/api.types';
import { userResponseFactory } from './me';
import * as faker from 'faker';

export const authResponseFactory = FactoryBuilder.of<AuthResponseDto>()
  .props({
    user: userResponseFactory.buildOne,
    token: faker.random.word,
  })
  .build();

export const loginUserFactory = FactoryBuilder.of<LoginUserRequestDto>()
  .props({
    username: faker.internet.userName,
    password: faker.internet.password,
  })
  .build();

export const signUpRequestFactory = FactoryBuilder.of<SignUpUserRequestDto>()
  .props({
    username: faker.internet.userName,
    password: faker.internet.password,
    email: faker.internet.email,
  })
  .build();
