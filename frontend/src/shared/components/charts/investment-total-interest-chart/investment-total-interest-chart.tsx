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

const InvestmentTotalInterestChart = ({ series }: Props) => {
  return (
    <Box width="100%">
      <Box textAlign="center" fontWeight="bold" fontSize="xl" mb={1}>
        Total interest
      </Box>
      <ResponsiveContainer aspect={4 / 3} maxHeight={400}>
        <ComposedChart data={series}>
          <Bar dataKey="totalInterest" name="Total interest" fill="#8884d8" />
          <Line
            type="monotone"
            dataKey="totalInterest"
            name="Total interest"
            stroke="#ff7300"
          />
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            dataKey="totalInterest"
            tickFormatter={(value) =>
              value >= 1_000_000 ? `${value / 1000}k` : value
            }
          />
          <XAxis dataKey="year" />
          <Tooltip />
          <Legend />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default InvestmentTotalInterestChart;
