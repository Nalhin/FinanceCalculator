import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import FrequencySelect from '../../shared/components/forms/frequency-select/frequency-select';
import SliderInput from '../../shared/components/forms/slider-input/slider-input';
import { InvestmentConfig } from '../../shared/models/compound-interest-rate-calculator/compound-interest-rate-calculator';
import { InvestmentSummary } from '../../shared/components/investment/investment-summary';
import WithInvestmentConfig from '../../shared/components/forms/with-investment-config/with-investment-config';
import InvestmentChart from '../../shared/components/investment/investment-chart';
import { calculateCompoundInterestTimeSeries } from '../../shared/models/compound-interest-rate-calculator/compound-interest-time-series';
import { DEFAULT_INVESTMENT_CONFIG } from '../../shared/constants/default-investment-config';

const Calculator = () => {
  const { control } = useForm<InvestmentConfig>({
    defaultValues: DEFAULT_INVESTMENT_CONFIG,
  });

  return (
    <Flex justify="center" align="center" direction="column" mx={'25%'}>
      <WithInvestmentConfig
        control={control}
        render={(config) => <InvestmentSummary config={config} />}
      />
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
          <FrequencySelect label="Compound Frequency" {...props} />
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
            label="Additional Contribution"
            {...props}
          />
        )}
      />
      <Controller
        control={control}
        name="paymentFrequency"
        render={({ ref, ...props }) => (
          <FrequencySelect label="Payment Frequency" {...props} />
        )}
      />
      <WithInvestmentConfig
        control={control}
        render={(config) => (
          <InvestmentChart
            series={calculateCompoundInterestTimeSeries(config)}
          />
        )}
      />
    </Flex>
  );
};

export default Calculator;
