import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { InvestmentConfig } from '../../shared/models/interest-calculator/compound-interest-rate-calculator/compound-interest-rate-calculator';
import WithInvestmentConfig from '../../shared/components/forms/with-investment-config/with-investment-config';
import InvestmentChart from '../../shared/components/investment/investment-chart';
import { calculateCompoundInterestTimeSeries } from '../../shared/models/interest-calculator/calculate-compound-interest-time-series/compound-interest-time-series';
import { DEFAULT_INVESTMENT_CONFIG } from '../../shared/constants/default-investment-config';
import InvestmentConfigFormControlGroup from '../../shared/components/forms/investment-config-form-control-group/investment-config-form-control-group';
import InvestmentSummary from '../../shared/components/investment/investment-summary';

const Calculator = () => {
  const { control } = useForm<InvestmentConfig>({
    defaultValues: DEFAULT_INVESTMENT_CONFIG,
  });

  return (
    <Flex justify="center" align="center">
      <Flex direction="column" maxWidth="90%">
        <WithInvestmentConfig
          control={control}
          render={(config) => <InvestmentSummary config={config} />}
        />
        <InvestmentConfigFormControlGroup control={control} />
        <WithInvestmentConfig
          control={control}
          render={(config) => (
            <InvestmentChart
              series={calculateCompoundInterestTimeSeries(config)}
            />
          )}
        />
      </Flex>
    </Flex>
  );
};

export default Calculator;
