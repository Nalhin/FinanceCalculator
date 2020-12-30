import React from 'react';
import {
  INVESTMENT_RISK_SCHEME_COLORS,
  INVESTMENT_RISK_TRANSLATIONS,
  InvestmentRisk,
} from '../../../constants/investment-risk';
import { Badge } from '@chakra-ui/react';

interface Props {
  risk: InvestmentRisk;
}

const InvestmentRiskBadge = ({ risk }: Props) => {
  return (
    <Badge
      variant="solid"
      p={1}
      ml={2}
      colorScheme={INVESTMENT_RISK_SCHEME_COLORS[risk]}
    >
      {INVESTMENT_RISK_TRANSLATIONS[risk]} Risk
    </Badge>
  );
};

export default InvestmentRiskBadge;
