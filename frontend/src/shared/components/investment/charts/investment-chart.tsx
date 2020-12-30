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
import { CompoundInterestTimeSeries } from '../../../models/interest-calculator/calculate-compound-interest-time-series/compound-interest-time-series';
import { Box } from '@chakra-ui/react';

interface Props {
  series: CompoundInterestTimeSeries[];
}

const InvestmentChart = ({ series }: Props) => {
  return (
    <Box width="100%">
      <Box textAlign="center" fontWeight="bold" fontSize="xl" mb={1}>
        Summary
      </Box>
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
            stroke="#3182CE"
            fill="#3182CE"
            name="Total interest"
          />
          <Area
            type="monotone"
            dataKey="futureValue"
            stroke="#38A169"
            fill="#38A169"
            opacity="0.6"
            name="Future value"
          />
          <Area
            type="monotone"
            dataKey="totalPayments"
            stroke="#ECC94B"
            fill="#ECC94B"
            name="Total payments"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default InvestmentChart;
