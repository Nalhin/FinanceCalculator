import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CompoundInterestTimeSeries } from '../../models/interest-calculator/calculate-compound-interest-time-series/compound-interest-time-series';

interface Props {
  series: CompoundInterestTimeSeries[];
}

const InvestmentChart = ({ series }: Props) => {
  return (
    <ResponsiveContainer aspect={4 / 3} maxHeight={400}>
      <AreaChart data={series}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
          dataKey="futureValue"
          tickFormatter={(value) =>
            value >= 1_000_000 ? `${value / 1000}k` : value
          }
        />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="totalInterest"
          stroke="#8884d8"
          fill="#8884d8"
          name="Total interest"
        />
        <Area
          type="monotone"
          dataKey="futureValue"
          stroke="#82ca9d"
          fill="#82ca9d"
          name="Future value"
        />
        <Area
          type="monotone"
          dataKey="totalPayments"
          stroke="#ffc658"
          fill="#ffc658"
          name="Total payments"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default InvestmentChart;
