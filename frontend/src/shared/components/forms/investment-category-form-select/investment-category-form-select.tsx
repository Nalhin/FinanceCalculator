import React from 'react';
import SelectFormControl from '../select-form-control/select-form-control';
import { INVESTMENT_ENTRIES } from '../../../constants/investment-category';

interface Props {
  label: string;
  name: string;
}

const InvestmentCategoryFormSelect = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLSelectElement>) => {
    return (
      <SelectFormControl entries={INVESTMENT_ENTRIES} {...props} ref={ref} />
    );
  },
);

export default InvestmentCategoryFormSelect;
