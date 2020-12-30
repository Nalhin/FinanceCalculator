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
import { YearlyInterestTimeSeries } from '../../../utils/calculate-yearly-interest-time-series/calculate-yearly-interest-time-series';
import { Box } from '@chakra-ui/react';

interface Props {
  series: YearlyInterestTimeSeries[];
}

const InvestmentYearlyInterestChart = ({ series }: Props) => {
  return (
    <Box width="100%">
      <Box textAlign="center" fontWeight="bold" fontSize="xl" mb={1}>
        Yearly interest
      </Box>
      <ResponsiveContainer aspect={4 / 3} maxHeight={400}>
        <ComposedChart width={500} height={300} data={series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            dataKey="yearlyInterest"
            tickFormatter={(value) =>
              value >= 1_000_000 ? `${value / 1000}k` : value
            }
          />
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
    </Box>
  );
};

export default InvestmentYearlyInterestChart;
