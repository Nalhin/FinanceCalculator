import React from 'react';
import { Control } from 'react-hook-form/dist/types/form';
import { InvestmentConfig } from '../../../models/interest-calculator/compound-interest-rate-calculator/compound-interest-rate-calculator';
import { Controller, FieldError } from 'react-hook-form';
import NumberInput from '../number-input-form-control/number-input-form-control';
import FrequencySelect from '../frequency-form-select/frequency-select';

interface Props {
  control: Control<InvestmentConfig>;
  errors?: { [K in keyof InvestmentConfig]?: FieldError };
}

const InvestmentConfigFormControlGroup = ({ control, errors }: Props) => {
  return (
    <>
      <Controller
        control={control}
        name="startAmount"
        render={(props) => (
          <NumberInput
            label="Initial amount"
            min={0}
            max={10_000_000}
            error={errors?.startAmount}
            {...props}
          />
        )}
      />
      <Controller
        control={control}
        name="annualInterestRate"
        render={(props) => (
          <NumberInput
            min={0}
            max={30}
            label="Estimated annual rate of return"
            error={errors?.annualInterestRate}
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
          <NumberInput
            min={1}
            max={30}
            label="Years of growth"
            {...props}
            error={errors?.yearsOfGrowth}
          />
        )}
      />
      <Controller
        control={control}
        name="payment"
        render={(props) => (
          <NumberInput
            min={0}
            max={1_000_000}
            label="Additional payment"
            error={errors?.payment}
            {...props}
          />
        )}
      />
      <FrequencySelect
        name="paymentFrequency"
        label="Payment frequency"
        ref={control.register({ valueAsNumber: true })}
      />
    </>
  );
};

export default InvestmentConfigFormControlGroup;
