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
import { CompoundInterestTimeSeries } from '../../../utils/calculate-compound-interest-time-series/compound-interest-time-series';
import { Box } from '@chakra-ui/react';

interface Props {
  series: CompoundInterestTimeSeries[];
}

const InvestmentTotalPaymentsChart = ({ series }: Props) => {
  return (
    <Box width="100%">
      <Box textAlign="center" fontWeight="bold" fontSize="xl" mb={1}>
        Total payments
      </Box>
      <ResponsiveContainer aspect={4 / 3} maxHeight={400}>
        <ComposedChart data={series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            dataKey="totalPayments"
            tickFormatter={(value) =>
              value >= 1_000_000 ? `${value / 1000}k` : value
            }
          />
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
    </Box>
  );
};

export default InvestmentTotalPaymentsChart;
