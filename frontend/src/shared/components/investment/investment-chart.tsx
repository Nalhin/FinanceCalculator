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
import { CalculateCompoundInterestTimeSeries } from '../../models/compound-interest-rate-calculator/calculate-compound-interest-time-series/calculate-compound-interest-time-series';

interface Props {
  series: CalculateCompoundInterestTimeSeries[];
}

const InvestmentChart = ({ series }: Props) => {
  return (
    <ResponsiveContainer aspect={4 / 3} maxHeight={400}>
      <AreaChart data={series}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
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
