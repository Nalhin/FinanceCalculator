import React from 'react';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import FrequencySelect from './frequency-select';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

describe('FrequencySelect component', () => {
  it('should fire onChange callback with the selected value', () => {
    renderWithProviders(<FrequencySelect label={'select'} name={'select'} />);

    userEvent.selectOptions(screen.getByLabelText(/select/i), String(4));

    expect(screen.getByLabelText(/select/i)).toHaveValue('4');
  });
});
