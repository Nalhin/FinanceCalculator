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
import { CompoundInterestTimeSeries } from '../../models/interest-calculator/calculate-compound-interest-time-series/compound-interest-time-series';

interface Props {
  series: CompoundInterestTimeSeries[];
}

const InvestmentTotalPaymentsChart = ({ series }: Props) => {
  return (
    <ResponsiveContainer aspect={4 / 3} maxHeight={400}>
      <ComposedChart data={series}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis dataKey="totalPayments" />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalPayments" name="Total payments" fill="#8884d8" />
        <Line
          type="monotone"
          dataKey="totalPayments"
          name="Total payments"
          stroke="#ff7300"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default InvestmentTotalPaymentsChart;
