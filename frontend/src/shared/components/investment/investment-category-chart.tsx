import { Box } from '@chakra-ui/react';
import React from 'react';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';
import { InvestmentResponseDto } from '../../../core/api/api.types';
import {
  INVESTMENT_RISK_COLORS,
  INVESTMENT_RISK_TRANSLATIONS,
  InvestmentRisk,
} from '../../constants/investment-risk';

function getCategoryCounter(investments: InvestmentResponseDto[]) {
  return investments.reduce<{ [K in InvestmentRisk]?: number }>(
    (prev, curr) => {
      if (!prev[curr.risk]) {
        prev[curr.risk] = 0;
      }
      (prev[curr.risk] as number)++;
      return prev;
    },
    {},
  );
}

function counterToChart(counter: { [K in InvestmentRisk]?: number }) {
  return (Object.keys(counter) as InvestmentRisk[]).map((risk) => ({
    fill: INVESTMENT_RISK_COLORS[risk],
    name: INVESTMENT_RISK_TRANSLATIONS[risk],
    count: counter[risk],
  }));
}

interface Props {
  investments: InvestmentResponseDto[];
}

const InvestmentCategoryChart = ({ investments }: Props) => {
  const data = React.useMemo(
    () => counterToChart(getCategoryCounter(investments)),
    [investments],
  );

  return (
    <Box>
      <Box textAlign="center" fontWeight="bold" fontSize="xl">
        Category distribution
      </Box>
      <PieChart width={320} height={280}>
        <Pie dataKey="count" data={data} outerRadius={80} label />
        <Legend />
        <Tooltip />
      </PieChart>
    </Box>
  );
};

export default InvestmentCategoryChart;
