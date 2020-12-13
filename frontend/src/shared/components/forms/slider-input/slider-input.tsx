import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
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

const SliderInput = ({
  label,
  onChange,
  onBlur,
  name,
  value,
  min,
  max,
}: Props) => {
  return (
    <FormControl>
      <FormLabel id={name}>{label}</FormLabel>
      <NumberInput
        min={min}
        max={max}
        onBlur={onBlur}
        value={value}
        keepWithinRange
        onChange={(strVal, numVal) => onChange(numVal)}
      >
        <NumberInputField />
      </NumberInput>
      <Slider
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        min={min}
        max={max}
        focusThumbOnChange={false}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </FormControl>
  );
};

export default SliderInput;
