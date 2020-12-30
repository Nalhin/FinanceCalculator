import {
  Flex,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import React from 'react';
import {
  CompoundInterestRateCalculator,
  InvestmentConfig,
} from '../../../models/interest-calculator/compound-interest-rate-calculator/compound-interest-rate-calculator';
import { calculateYearlyInvestmentSummary } from '../../../models/interest-calculator/calculate-yearly-investment-sumary/calculate-yearly-investment-summary';

interface Props {
  config: InvestmentConfig;
}

const InvestmentStatsSummary = ({ config }: Props) => {
  const {
    totalInterest,
    percentageInterest,
  } = new CompoundInterestRateCalculator(config);

  const {
    yearlyInterest,
    yearlyPercentageInterest,
  } = calculateYearlyInvestmentSummary(config);

  return (
    <StatGroup width="100%" as={Flex} justify="space-around" textAlign="center">
      <Stat p={2}>
        <StatLabel>Total Interest</StatLabel>
        <StatNumber aria-label="estimated total interest">
          {totalInterest.toFixed(2)} $
        </StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          {percentageInterest.toFixed(2)} %
        </StatHelpText>
      </Stat>
      <Stat p={2}>
        <StatLabel>Interest next year</StatLabel>
        <StatNumber>{yearlyInterest.toFixed(2)} $</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          {yearlyPercentageInterest.toFixed(2)} %
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
};

export default InvestmentStatsSummary;
