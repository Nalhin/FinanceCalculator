import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import InvestmentChart from '../../../../shared/components/investment/charts/investment-chart';
import InvestmentTotalInterestChart from '../../../../shared/components/investment/charts/investment-total-interest-chart';
import InvestmentYearlyInterestChart from '../../../../shared/components/investment/charts/investment-yearly-interest-chart';
import { calculateYearlyInterestTimeSeries } from '../../../../shared/models/interest-calculator/calculate-yearly-interest-time-series/calculate-yearly-interest-time-series';
import InvestmentTotalPaymentsChart from '../../../../shared/components/investment/charts/investment-total-payments-chart';
import InvestmentYearlyPaymentsChart from '../../../../shared/components/investment/charts/investment-yearly-payments-chart';
import { calculateYearlyPaymentsTimeSeries } from '../../../../shared/models/interest-calculator/calculate-yearly-payments-time-series/calculate-yearly-payments-time-series';
import InvestmentCategoryChart from '../../../../shared/components/investment/charts/investment-category-chart';
import InvestmentRiskChart from '../../../../shared/components/investment/charts/investment-risk-chart';
import { calculateJoinedInterestTimeSeries } from '../../../../shared/models/interest-calculator/calculate-joined-interest-time-series/calculate-joined-interest-time-series';
import { InvestmentResponseDto } from '../../../../core/api/api.types';

interface Props {
  investments: InvestmentResponseDto[];
}

const BasketSummary = ({ investments }: Props) => {
  const joinedSeries = React.useMemo(
    () => calculateJoinedInterestTimeSeries(investments),
    [investments],
  );

  return (
    <Box width="90%" mx="auto" my={6}>
      <InvestmentChart series={joinedSeries} />
      <Flex direction={{ base: 'column', lg: 'row' }}>
        <InvestmentTotalInterestChart series={joinedSeries} />
        <InvestmentYearlyInterestChart
          series={calculateYearlyInterestTimeSeries(joinedSeries)}
        />
      </Flex>
      <Flex direction={{ base: 'column', lg: 'row' }} my={6}>
        <InvestmentTotalPaymentsChart series={joinedSeries} />
        <InvestmentYearlyPaymentsChart
          series={calculateYearlyPaymentsTimeSeries(joinedSeries)}
        />
      </Flex>
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        justify={{ base: 'center', lg: 'space-around' }}
        alignItems="center"
        my={6}
      >
        <InvestmentCategoryChart investments={investments} />
        <InvestmentRiskChart investments={investments} />
      </Flex>
    </Box>
  );
};

export default BasketSummary;
