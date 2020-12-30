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
import { YearlyPaymentsTimeSeries } from '../../../models/interest-calculator/calculate-yearly-payments-time-series/calculate-yearly-payments-time-series';
import { Box } from '@chakra-ui/react';

interface Props {
  series: YearlyPaymentsTimeSeries[];
}

const InvestmentYearlyPaymentsChart = ({ series }: Props) => {
  return (
    <Box width="100%">
      <Box textAlign="center" fontWeight="bold" fontSize="xl" mb={1}>
        Yearly payments
      </Box>
      <ResponsiveContainer aspect={4 / 3} maxHeight={400}>
        <ComposedChart width={500} height={300} data={series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            dataKey="yearlyPayments"
            tickFormatter={(value) =>
              value >= 1_000_00 ? `${value / 1000}k` : value
            }
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="yearlyPayments" name="Yearly Payments" fill="#8884d8" />
          <Line
            type="monotone"
            dataKey="yearlyPayments"
            name="Yearly Payments"
            stroke="#ff7300"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default InvestmentYearlyPaymentsChart;
