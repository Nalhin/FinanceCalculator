/* tslint:disable */
/* eslint-disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthResponseDto {
  token: string;
  user: UserResponseDto;
}

export interface BasketResponseDto {
  createdDate: string;
  id: number;
  name: string;
}

export interface InvestmentResponseDto {
  annualInterestRate: number;
  category: string;
  created: string;
  id: number;
  payment: number;
  paymentFrequency: number;
  risk: string;
  startAmount: number;
  yearsOfGrowth: number;
}

export interface LoginUserRequestDto {
  password: string;
  username: string;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
}

export interface PageBasketResponseDto {
  content: BasketResponseDto[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}

export interface SaveBasketRequestDto {
  name: string;
}

export interface SaveInvestmentDto {
  annualInterestRate: number;
  category: string;
  compoundFrequency: number;
  payment: number;
  paymentFrequency: number;
  risk: string;
  startAmount: number;
  yearsOfGrowth: number;
}

export interface SignUpUserRequestDto {
  email: string;
  password: string;
  username: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface UpdateBasketRequestDto {
  name: string;
}

export interface UpdateInvestmentRequestDto {
  annualInterestRate: number;
  category: string;
  compoundFrequency: number;
  payment: number;
  paymentFrequency: number;
  risk: string;
  startAmount: number;
  yearsOfGrowth: number;
}

export interface UserResponseDto {
  email: string;
  username: string;
}
