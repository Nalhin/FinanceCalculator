import { Box } from '@chakra-ui/react';
import React from 'react';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';
import { InvestmentResponseDto } from '../../../../../core/api/api.types';
import {
  INVESTMENT_CATEGORIES_TRANSLATIONS,
  INVESTMENT_CATEGORY_COLORS,
  InvestmentCategory,
} from '../../../../constants/investment-category';

function getCategoryCounter(investments: InvestmentResponseDto[]) {
  return investments.reduce<{ [K in InvestmentCategory]?: number }>(
    (prev, curr) => {
      if (!prev[curr.category]) {
        prev[curr.category] = 0;
      }
      (prev[curr.category] as number)++;
      return prev;
    },
    {},
  );
}

function counterToChart(counter: { [K in InvestmentCategory]?: number }) {
  return (Object.keys(counter) as InvestmentCategory[]).map((category) => ({
    fill: INVESTMENT_CATEGORY_COLORS[category],
    name: INVESTMENT_CATEGORIES_TRANSLATIONS[category],
    count: counter[category],
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
