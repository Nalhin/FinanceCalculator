import React from 'react';
import { InvestmentConfig } from '../../../models/interest-calculator/compound-interest-rate-calculator';
import { calculateCompoundInterestTimeSeries } from '../../../utils/calculate-compound-interest-time-series/compound-interest-time-series';
import { Flex } from '@chakra-ui/react';
import InvestmentOverviewChart from '../../charts/investment-overview-chart/investment-overview-chart';
import InvestmentTotalInterestChart from '../../charts/investment-total-interest-chart/investment-total-interest-chart';
import InvestmentYearlyInterestChart from '../../charts/investment-yearly-interest-chart/investment-yearly-interest-chart';
import { calculateYearlyInterestTimeSeries } from '../../../utils/calculate-yearly-interest-time-series/calculate-yearly-interest-time-series';
import { calculateYearlyPaymentsTimeSeries } from '../../../utils/calculate-yearly-payments-time-series/calculate-yearly-payments-time-series';
import InvestmentYearlyPaymentsChart from '../../charts/investment-yearly-payments-chart/investment-yearly-payments-chart';
import InvestmentTotalPaymentsChart from '../../charts/investment-total-payments-chart/investment-total-payments-chart';

interface Props {
  investment: InvestmentConfig;
}

const InvestmentSummary = ({ investment }: Props) => {
  const series = React.useMemo(
    () => calculateCompoundInterestTimeSeries(investment),
    [investment],
  );
  return (
    <Flex width="100%" direction="column" mx="auto">
      <InvestmentOverviewChart series={series} />
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
