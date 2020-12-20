import React from 'react';
import { Control } from 'react-hook-form/dist/types/form';
import { InvestmentConfig } from '../../../models/compound-interest-rate-calculator/compound-interest-rate-calculator/compound-interest-rate-calculator';
import { Controller } from 'react-hook-form';
import SliderInput from '../slider-input/slider-input';
import FrequencySelect from '../frequency-select/frequency-select';

interface Props {
  control: Control<InvestmentConfig>;
}

const InvestmentConfigFormControlGroup = ({ control }: Props) => {
  return (
    <>
      <Controller
        control={control}
        name="startAmount"
        render={({ ref, ...props }) => (
          <SliderInput
            label="Initial amount"
            min={1}
            max={1_000_000_000}
            {...props}
          />
        )}
      />
      <Controller
        control={control}
        name="annualInterestRate"
        render={({ ref, ...props }) => (
          <SliderInput
            min={1}
            max={15}
            label="Estimated annual rate of return"
            {...props}
          />
        )}
      />
      <Controller
        control={control}
        name="compoundFrequency"
        render={({ ref, ...props }) => (
          <FrequencySelect label="Compound frequency" {...props} />
        )}
      />
      <Controller
        control={control}
        name="yearsOfGrowth"
        render={({ ref, ...props }) => (
          <SliderInput min={1} max={15} label="Years of growth" {...props} />
        )}
      />
      <Controller
        control={control}
        name="payment"
        render={({ ref, ...props }) => (
          <SliderInput
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
        render={({ ref, ...props }) => (
          <FrequencySelect label="Payment frequency" {...props} />
        )}
      />
    </>
  );
};

export default InvestmentConfigFormControlGroup;
