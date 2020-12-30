import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import {
  Frequency,
  FREQUENCY_TRANSLATIONS,
} from '../../../shared/constants/frequency';
import React from 'react';
import { InvestmentResponseDto } from '../../../core/api/api.types';
import InvestmentCategoryBadge from '../../../shared/components/investment/badges/investment-category-badge';
import InvestmentRiskBadge from '../../../shared/components/investment/badges/investment-risk-badge';

interface Props {
  investment: InvestmentResponseDto;
}

const InvestmentDetailsTable = ({ investment }: Props) => {
  return (
    <Table mx="auto" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Thead>
        <Tr>
          <Th>Property</Th>
          <Th isNumeric>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Type</Td>
          <Td isNumeric>
            <InvestmentCategoryBadge category={investment.category} />
          </Td>
        </Tr>
        <Tr>
          <Td>Risk</Td>
          <Td isNumeric>
            <InvestmentRiskBadge risk={investment.risk} />
          </Td>
        </Tr>
        <Tr>
          <Td>Initial amount</Td>
          <Td isNumeric>{investment.startAmount}$</Td>
        </Tr>
        <Tr>
          <Td>Estimated annual rate of return</Td>
          <Td isNumeric>{investment.annualInterestRate}%</Td>
        </Tr>
        <Tr>
          <Td>Compound frequency</Td>
          <Td isNumeric>
            {FREQUENCY_TRANSLATIONS[investment.compoundFrequency as Frequency]}
          </Td>
        </Tr>
        <Tr>
          <Td>Years of growth</Td>
          <Td isNumeric>{investment.yearsOfGrowth}</Td>
        </Tr>
        <Tr>
          <Td>Additional payment</Td>
          <Td isNumeric>{investment.payment}$</Td>
        </Tr>
        <Tr>
          <Td>Payment Frequency</Td>
          <Td isNumeric>
            {FREQUENCY_TRANSLATIONS[investment.paymentFrequency as Frequency]}
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default InvestmentDetailsTable;
