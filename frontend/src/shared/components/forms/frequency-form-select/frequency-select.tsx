import React from 'react';
import SelectFormControl from '../select-form-control/select-form-control';
import { FREQUENCY_ENTRIES } from '../../../constants/frequency';

interface Props {
  label: string;
  name: string;
}

const FrequencySelect = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLSelectElement>) => {
    return (
      <SelectFormControl {...props} ref={ref} entries={FREQUENCY_ENTRIES} />
    );
  },
);

export default FrequencySelect;
