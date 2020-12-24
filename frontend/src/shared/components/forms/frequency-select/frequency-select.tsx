import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import React from 'react';

interface Props {
  label: string;
  onChange: (val: number) => void;
  name: string;
  value: number;
}

const FrequencySelect = React.forwardRef(
  ({ label, name, onChange }: Props, ref: React.Ref<HTMLSelectElement>) => {
    return (
      <FormControl>
        <FormLabel id={name}>{label}</FormLabel>
        <Select ref={ref} onChange={(e) => onChange(Number(e.target.value))}>
          <option value={1}>Annually (1)</option>
          <option value={2}>Semi-Annually (2)</option>
          <option value={4}>Quarterly (4)</option>
          <option value={6}>Bi-Monthly (6)</option>
          <option value={12}>Monthly (12)</option>
          <option value={24}>Semi-Monthly (24)</option>
          <option value={52}>Weekly (52)</option>
        </Select>
      </FormControl>
    );
  },
);

export default FrequencySelect;
