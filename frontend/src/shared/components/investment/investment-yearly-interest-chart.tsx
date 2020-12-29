import React from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { YearlyInterestTimeSeries } from '../../models/interest-calculator/calculate-yearly-interest-time-series/calculate-yearly-interest-time-series';

interface Props {
  series: YearlyInterestTimeSeries[];
}

const InvestmentYearlyInterestChart = ({ series }: Props) => {
  return (
    <ResponsiveContainer aspect={4 / 3} maxHeight={400}>
      <ComposedChart width={500} height={300} data={series}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis dataKey="yearlyInterest" />
        <Tooltip />
        <Legend />
        <Bar dataKey="yearlyInterest" name="Yearly Interest" fill="#8884d8" />
        <Line
          type="monotone"
          dataKey="yearlyInterest"
          name="Yearly interest"
          stroke="#ff7300"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default InvestmentYearlyInterestChart;
