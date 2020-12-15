import { axios } from '../axios';
import { UserResponseDto } from '../api.interface';

export const getMe = () => {
  return axios.get<UserResponseDto>('/me');
};
