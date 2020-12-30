import React from 'react';
import { InvestmentConfig } from '../../../models/interest-calculator/compound-interest-rate-calculator/compound-interest-rate-calculator';
import { calculateCompoundInterestTimeSeries } from '../../../models/interest-calculator/calculate-compound-interest-time-series/compound-interest-time-series';
import { Flex } from '@chakra-ui/react';
import InvestmentChart from '../charts/investment-chart';
import InvestmentTotalInterestChart from '../charts/investment-total-interest-chart';
import InvestmentYearlyInterestChart from '../charts/investment-yearly-interest-chart';
import { calculateYearlyInterestTimeSeries } from '../../../models/interest-calculator/calculate-yearly-interest-time-series/calculate-yearly-interest-time-series';
import { calculateYearlyPaymentsTimeSeries } from '../../../models/interest-calculator/calculate-yearly-payments-time-series/calculate-yearly-payments-time-series';
import InvestmentYearlyPaymentsChart from '../charts/investment-yearly-payments-chart';
import InvestmentTotalPaymentsChart from '../charts/investment-total-payments-chart';

interface Props {
  investment: InvestmentConfig;
}

const InvestmentSummary = ({ investment }: Props) => {
  const series = React.useMemo(
    () => calculateCompoundInterestTimeSeries(investment),
    [investment],
  );
  return (
    <Flex width="90%" direction="column" mx="auto">
      <InvestmentChart series={series} />
      <Flex direction={{ base: 'column', lg: 'row' }}>
        <InvestmentTotalInterestChart series={series} />
        <InvestmentYearlyInterestChart
          series={calculateYearlyInterestTimeSeries(series)}
        />
      </Flex>
      <Flex direction={{ base: 'column', lg: 'row' }}>
        <InvestmentTotalPaymentsChart series={series} />
        <InvestmentYearlyPaymentsChart
          series={calculateYearlyPaymentsTimeSeries(series)}
        />
      </Flex>
    </Flex>
  );
};

export default InvestmentSummary;
