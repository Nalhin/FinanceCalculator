import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { InvestmentResponseDto } from '../../../core/api/api.types';
import {
  INVESTMENT_CATEGORIES_TRANSLATIONS,
  INVESTMENT_CATEGORY_COLORS,
  InvestmentCategories,
} from '../../constants/investment-category';

function getCategoriesCounter(investments: InvestmentResponseDto[]) {
  return investments.reduce<{ [K in InvestmentCategories]?: number }>(
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

const counterToChart = (counter: { [K in InvestmentCategories]?: number }) => {
  return (Object.keys(counter) as InvestmentCategories[]).map((category) => ({
    fill: INVESTMENT_CATEGORY_COLORS[category],
    name: INVESTMENT_CATEGORIES_TRANSLATIONS[category],
    count: counter[category],
  }));
};

interface Props {
  investments: InvestmentResponseDto[];
}

const InvestmentCategoryChart = ({ investments }: Props) => {
  const data = React.useMemo(
    () => counterToChart(getCategoriesCounter(investments)),
    [investments],
  );

  return (
    <ResponsiveContainer aspect={4 / 3} maxHeight={400}>
      <PieChart width={400} height={400}>
        <Pie dataKey="count" data={data} cx={200} cy={200} outerRadius={80} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default InvestmentCategoryChart;
