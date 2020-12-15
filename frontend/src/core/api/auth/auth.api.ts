import { axios } from '../axios';
import {
  AuthResponseDto,
  LoginUserRequestDto,
  SignUpUserRequestDto,
} from '../api.interface';

export const postLogin = (body: LoginUserRequestDto) => {
  return axios.post<AuthResponseDto>('/auth/login', body);
};

export const postSignUp = (body: SignUpUserRequestDto) => {
  return axios.post<AuthResponseDto>('/auth/sign-up', body);
};
