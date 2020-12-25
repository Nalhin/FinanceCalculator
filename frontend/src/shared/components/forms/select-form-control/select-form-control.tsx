import React from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

interface Props {
  label: string;
  name: string;
  entries: { value: string | number; label: string }[];
}

const SelectFormControl = React.forwardRef(
  ({ label, name, entries }: Props, ref: React.Ref<HTMLSelectElement>) => {
    return (
      <FormControl>
        <FormLabel id={name}>{label}</FormLabel>
        <Select ref={ref} name={name}>
          {entries.map((entry) => (
            <option key={entry.value} value={entry.value}>
              {entry.label}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  },
);

export default SelectFormControl;
