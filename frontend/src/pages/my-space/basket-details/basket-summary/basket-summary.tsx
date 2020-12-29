import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import InvestmentChart from '../../../../shared/components/investment/investment-chart';
import InvestmentTotalInterestChart from '../../../../shared/components/investment/investment-total-interest-chart';
import InvestmentYearlyInterestChart from '../../../../shared/components/investment/investment-yearly-interest-chart';
import { calculateYearlyInterestTimeSeries } from '../../../../shared/models/interest-calculator/calculate-yearly-interest-time-series/calculate-yearly-interest-time-series';
import InvestmentTotalPaymentsChart from '../../../../shared/components/investment/investment-total-payments-chart';
import InvestmentYearlyPaymentsChart from '../../../../shared/components/investment/investment-yearly-payments-chart';
import { calculateYearlyPaymentsTimeSeries } from '../../../../shared/models/interest-calculator/calculate-yearly-payments-time-series/calculate-yearly-payments-time-series';
import InvestmentCategoryChart from '../../../../shared/components/investment/investment-category-chart';
import InvestmentRiskChart from '../../../../shared/components/investment/investment-risk-chart';
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

  if (investments.length < 0) {
    return <Box>No investments</Box>;
  }

  return (
    <Box width="90%" mx="auto">
      <InvestmentChart series={joinedSeries} />
      <Flex direction={{ base: 'column', lg: 'row' }}>
        <InvestmentTotalInterestChart series={joinedSeries} />
        <InvestmentYearlyInterestChart
          series={calculateYearlyInterestTimeSeries(joinedSeries)}
        />
      </Flex>
      <Flex direction={{ base: 'column', lg: 'row' }}>
        <InvestmentTotalPaymentsChart series={joinedSeries} />
        <InvestmentYearlyPaymentsChart
          series={calculateYearlyPaymentsTimeSeries(joinedSeries)}
        />
      </Flex>
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        justify={{ base: 'center', lg: 'space-around' }}
        alignItems="center"
      >
        <InvestmentCategoryChart investments={investments} />
        <InvestmentRiskChart investments={investments} />
      </Flex>
    </Box>
  );
};

export default BasketSummary;
