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
} from '../../models/compound-interest-rate-calculator/compound-interest-rate-calculator';

interface Props {
  config: InvestmentConfig;
}

function calculateInvestmentSummary(config: InvestmentConfig) {
  const totalPeriodCalculator = new CompoundInterestRateCalculator(config);
  const yearlyCalculator = new CompoundInterestRateCalculator({
    ...config,
    yearsOfGrowth: config.yearsOfGrowth ? 1 : 0,
  });
  return {
    totalInterest: totalPeriodCalculator.totalInterest,
    percentageInterest: totalPeriodCalculator.percentageInterest,
    yearlyProfit: yearlyCalculator.totalInterest,
    yearlyPercentageProfit: yearlyCalculator.percentageInterest,
  };
}

export const InvestmentSummary = ({ config }: Props) => {
  const {
    yearlyProfit,
    percentageInterest,
    totalInterest,
    yearlyPercentageProfit,
  } = calculateInvestmentSummary(config);

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
        <StatNumber>{yearlyProfit.toFixed(2)} $</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          {yearlyPercentageProfit.toFixed(2)} %
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
};
