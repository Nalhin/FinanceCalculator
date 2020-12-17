import { axios } from '../axios';
import { InvestmentResponseDto, SaveInvestmentDto } from '../api.interface';

export const getInvestmentsByBasket = (basketId: number) => {
  return axios.get<InvestmentResponseDto[]>(
    `/me/baskets/${basketId}/investments`,
  );
};

export const getInvestmentById = (basketId: number, investmentId: number) => {
  return axios.get<InvestmentResponseDto>(
    `/me/baskets/${basketId}/investments/${investmentId}`,
  );
};

export const saveInvestment = (body: SaveInvestmentDto, basketId: number) => {
  return axios.post(`/me/baskets/${basketId}/investments`, body);
};

export const updateInvestment = (basketId: number, investmentId: number) => {
  return axios.put(`/me/baskets/${basketId}/investments/${investmentId}`);
};

export const deleteInvestment = (basketId: number, investmentId: number) => {
  return axios.delete(`/me/baskets/${basketId}/investments/${investmentId}`);
};
