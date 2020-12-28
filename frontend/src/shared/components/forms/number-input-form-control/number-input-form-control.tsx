import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface Props {
  label: string;
  onChange: (val: number) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  value: number;
  min: number;
  max: number;
  error?: FieldError;
}

const SliderInput = React.forwardRef(
  (
    { label, onChange, onBlur, name, value, min, max, error }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    return (
      <FormControl isInvalid={!!error}>
        <FormLabel id={name}>{label}</FormLabel>
        <NumberInput
          min={min}
          max={max}
          onBlur={onBlur}
          value={value}
          keepWithinRange
          onChange={(strVal, numVal) => {
            onChange(isNaN(numVal) ? 0 : Math.min(numVal, max));
          }}
        >
          <NumberInputField ref={ref} />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </NumberInput>
      </FormControl>
    );
  },
);

export default SliderInput;
