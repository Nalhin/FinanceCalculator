import type { AxiosError } from 'axios';
import { ValidationErrorResponseDto } from '../../../core/api/api.types';
import { UseFormMethods } from 'react-hook-form';

export function populateFormWithApiErrors(
  error: AxiosError<ValidationErrorResponseDto>,
  setError: UseFormMethods['setError'],
) {
  const formErrors = error.response?.data?.errors ?? [];

  for (const formError of formErrors) {
    setError(formError.field, {
      message: formError.message,
    });
  }
}
