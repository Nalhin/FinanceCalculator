import React from 'react';
import { Control } from 'react-hook-form/dist/types/form';
import { InvestmentConfig } from '../../../models/interest-calculator/compound-interest-rate-calculator/compound-interest-rate-calculator';
import { Controller } from 'react-hook-form';
import NumberInput from '../number-input-form-control/number-input-form-control';
import FrequencySelect from '../frequency-form-select/frequency-select';

interface Props {
  control: Control<InvestmentConfig>;
}

const InvestmentConfigFormControlGroup = ({ control }: Props) => {
  return (
    <>
      <Controller
        control={control}
        name="startAmount"
        render={(props) => (
          <NumberInput
            label="Initial amount"
            min={1}
            max={10_000_000}
            {...props}
          />
        )}
      />
      <Controller
        control={control}
        name="annualInterestRate"
        render={(props) => (
          <NumberInput
            min={1}
            max={15}
            label="Estimated annual rate of return"
            {...props}
          />
        )}
      />
      <FrequencySelect
        name="compoundFrequency"
        label="Compound frequency"
        ref={control.register({ valueAsNumber: true })}
      />
      <Controller
        control={control}
        name="yearsOfGrowth"
        render={(props) => (
          <NumberInput min={1} max={15} label="Years of growth" {...props} />
        )}
      />
      <Controller
        control={control}
        name="payment"
        render={(props) => (
          <NumberInput
            min={1}
            max={1_000_000}
            label="Additional payment"
            {...props}
          />
        )}
      />
      <Controller
        control={control}
        name="paymentFrequency"
        render={(props) => (
          <FrequencySelect label="Payment frequency" {...props} />
        )}
      />
    </>
  );
};

export default InvestmentConfigFormControlGroup;
