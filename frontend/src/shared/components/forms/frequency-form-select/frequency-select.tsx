import React from 'react';
import SelectFormControl from '../select-form-control/select-form-control';

const SELECT_ENTRIES = [
  {
    value: 1,

    label: 'Annually (1)',
  },
  {
    value: 2,
    label: 'Semi-Annually (2)',
  },
  {
    value: 4,
    label: 'Quarterly (4)',
  },
  { value: 6, label: 'Bi-Monthly (6)' },
  { value: 12, label: 'Monthly (12)' },
  { value: 24, label: 'Semi-Monthly (24)' },
  {
    value: 52,
    label: 'Weekly (52)',
  },
];

interface Props {
  label: string;
  name: string;
}

const FrequencySelect = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLSelectElement>) => {
    return <SelectFormControl {...props} ref={ref} entries={SELECT_ENTRIES} />;
  },
);

export default FrequencySelect;
