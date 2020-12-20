import React from 'react';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import FrequencySelect from './frequency-select';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

describe('FrequencySelect component', () => {
  it('should fire onChange callback with the selected value', () => {
    const onChange = jest.fn();
    renderWithProviders(
      <FrequencySelect
        label={'select'}
        onChange={onChange}
        name={'select'}
        value={1}
      />,
    );

    userEvent.selectOptions(screen.getByLabelText(/select/i), String(4));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
