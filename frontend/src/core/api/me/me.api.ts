import { axios } from '../axios';
import { UserResponseDto } from '../api.types';

export const getMe = () => {
  return axios.get<UserResponseDto>('/me');
};
