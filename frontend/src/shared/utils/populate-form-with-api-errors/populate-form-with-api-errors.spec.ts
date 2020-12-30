import { populateFormWithApiErrors } from './populate-form-with-api-errors';
import type { AxiosError } from 'axios';

describe('populateFormWithApiErrors', () => {
  it('should call setError on each error', () => {
    const setError = jest.fn();
    const error = {
      response: {
        data: {
          errors: [
            { field: 'field', message: 'message' },
            { field: 'field', message: 'message' },
          ],
        },
      },
    };

    populateFormWithApiErrors(error as AxiosError, setError);

    expect(setError).toHaveBeenCalledTimes(2);
    expect(setError).toHaveBeenCalledWith('field', { message: 'message' });
  });
});
