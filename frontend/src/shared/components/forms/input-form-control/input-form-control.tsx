import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface Props {
  label: string;
  name: string;
  error?: FieldError;
  type?: string;
}

const InputFormControl = React.forwardRef(
  ({ error, name, label, type }: Props, ref: React.Ref<HTMLInputElement>) => {
    return (
      <FormControl isInvalid={!!error} my={1}>
        <FormLabel htmlFor={name} mb={0}>
          {label}
        </FormLabel>
        <Input id={name} name={name} ref={ref} type={type} />
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    );
  },
);

export default InputFormControl;
