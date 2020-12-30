import { onAxiosError } from './on-axios-error';
import type { AxiosError } from 'axios';

describe('onAxiosError function', () => {
  it('should call function passed with the same status as response status', () => {
    const error = { response: { status: 400 } };
    const actions = {
      400: jest.fn(),
      '*': jest.fn(),
    };

    onAxiosError(error as AxiosError, actions);

    expect(actions['*']).toHaveBeenCalledTimes(0);
    expect(actions['400']).toHaveBeenCalledTimes(1);
  });
  it('should call function passed with "*" when provided and no match for status is found', () => {
    const error = { response: { status: 500 } };
    const actions = {
      400: jest.fn(),
      '*': jest.fn(),
    };

    onAxiosError(error as AxiosError, actions);

    expect(actions['*']).toHaveBeenCalledTimes(1);
    expect(actions['400']).toHaveBeenCalledTimes(0);
  });
});
