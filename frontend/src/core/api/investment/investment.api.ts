import { axios } from '../axios';
import {
  InvestmentResponseDto,
  SaveInvestmentRequestDto,
  UpdateInvestmentRequestDto,
} from '../api.types';

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

export const saveInvestment = (
  body: SaveInvestmentRequestDto,
  basketId: number,
) => {
  return axios.post<InvestmentResponseDto>(
    `/me/baskets/${basketId}/investments`,
    body,
  );
};

export const updateInvestment = (
  body: UpdateInvestmentRequestDto,
  basketId: number,
  investmentId: number,
) => {
  return axios.put<InvestmentResponseDto>(
    `/me/baskets/${basketId}/investments/${investmentId}`,
    body,
  );
};

export const deleteInvestment = (basketId: number, investmentId: number) => {
  return axios.delete<void>(
    `/me/baskets/${basketId}/investments/${investmentId}`,
  );
};
