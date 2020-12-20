import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import SliderInput from './slider-input';

describe('SliderInput component', () => {
  it('should fire onChange callback after a value is changes', () => {
    const onChange = jest.fn();
    renderWithProviders(
      <SliderInput
        label={'input'}
        onChange={onChange}
        name={'input'}
        value={1}
        onBlur={jest.fn()}
        min={0}
        max={100}
      />,
    );

    userEvent.type(screen.getByLabelText(/input/i), String(4));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(14);
  });
});
