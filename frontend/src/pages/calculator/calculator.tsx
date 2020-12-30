import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { InvestmentConfig } from '../../shared/models/interest-calculator/compound-interest-rate-calculator/compound-interest-rate-calculator';
import WithInvestmentConfig from '../../shared/components/forms/with-investment-config/with-investment-config';
import { DEFAULT_INVESTMENT_CONFIG } from '../../shared/constants/default-investment-config';
import InvestmentConfigFormControlGroup from '../../shared/components/forms/investment-config-form-control-group/investment-config-form-control-group';
import InvestmentStatsSummary from '../../shared/components/investment/investment-stats-summary/investment-stats-summary';
import InvestmentSummary from '../../shared/components/investment/investment-summary/investment-summary';

const Calculator = () => {
  const { control } = useForm<InvestmentConfig>({
    defaultValues: DEFAULT_INVESTMENT_CONFIG,
  });

  return (
    <Flex justify="center" align="center" mb={6}>
      <Flex direction="column" width="90%" align="center">
        <Box maxWidth="400px" width="100%">
          <WithInvestmentConfig
            control={control}
            render={(config) => <InvestmentStatsSummary config={config} />}
          />
        </Box>
        <Box maxWidth="400px" width="100%" mb={4}>
          <InvestmentConfigFormControlGroup control={control} />
        </Box>
        <WithInvestmentConfig
          control={control}
          render={(config) => <InvestmentSummary investment={config} />}
        />
      </Flex>
    </Flex>
  );
};

export default Calculator;
