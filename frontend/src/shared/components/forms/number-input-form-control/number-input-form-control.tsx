import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  label: string;
  onChange: (val: number) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  value: number;
  min: number;
  max: number;
}

const SliderInput = React.forwardRef(
  (
    { label, onChange, onBlur, name, value, min, max }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    return (
      <FormControl>
        <FormLabel id={name}>{label}</FormLabel>
        <NumberInput
          min={min}
          max={max}
          onBlur={onBlur}
          value={value}
          keepWithinRange
          onChange={(strVal, numVal) => {
            onChange(isNaN(numVal) ? 0 : numVal);
          }}
        >
          <NumberInputField ref={ref} />
        </NumberInput>
      </FormControl>
    );
  },
);

export default SliderInput;
