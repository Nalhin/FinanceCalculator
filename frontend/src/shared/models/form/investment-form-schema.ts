import * as yup from 'yup';

export const INVESTMENT_FORM_SCHEMA = yup.object().shape({
  annualInterestRate: yup.number().min(0).max(30),
  compoundFrequency: yup.number().min(1).max(52),
  payment: yup.number().min(0).max(1_000_000),
  paymentFrequency: yup.number().min(1).max(52),
  startAmount: yup.number().min(0).max(10_000_000),
  yearsOfGrowth: yup.number().min(1).max(30),
  category: yup.string().required('Category is required'),
});
