import { axios } from '../axios';
import {
  BasketResponseDto,
  PageBasketResponseDto,
  SaveBasketRequestDto,
  UpdateBasketRequestDto,
} from '../api.interface';

export const getMyBaskets = () => {
  return axios.get<PageBasketResponseDto>('/me/baskets', {
    params: { sort: 'createdDate,desc' },
  });
};

export const saveBasket = (body: SaveBasketRequestDto) => {
  return axios.post<BasketResponseDto>('/me/baskets', body);
};

export const updateBasket = (
  body: UpdateBasketRequestDto,
  basketId: number,
) => {
  return axios.put<BasketResponseDto>(`/me/baskets/${basketId}`, body);
};

export const deleteBasket = (basketId: number) => {
  return axios.delete(`/me/baskets/${basketId}`);
};
