import {
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
} from '../../models/compound-interest-rate-calculator/compound-interest-rate-calculator/compound-interest-rate-calculator';
import { calculateYearlyInvestmentSummary } from '../../models/compound-interest-rate-calculator/calculate-yearly-investment-sumary/calculate-yearly-investment-summary';

interface Props {
  config: InvestmentConfig;
}

const InvestmentSummary = ({ config }: Props) => {
  const {
    totalInterest,
    percentageInterest,
  } = new CompoundInterestRateCalculator(config);

  const {
    yearlyInterest,
    yearlyPercentageInterest,
  } = calculateYearlyInvestmentSummary(config);

  return (
    <StatGroup>
      <Stat p={2}>
        <StatLabel>Estimated Total Interest</StatLabel>
        <StatNumber aria-label="estimated total interest">
          {totalInterest.toFixed(2)} $
        </StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          {percentageInterest.toFixed(2)} %
        </StatHelpText>
      </Stat>
      <Stat p={2}>
        <StatLabel>Estimated Yearly Profit</StatLabel>
        <StatNumber>{yearlyInterest.toFixed(2)} $</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          {yearlyPercentageInterest.toFixed(2)} %
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
};

export default InvestmentSummary;
