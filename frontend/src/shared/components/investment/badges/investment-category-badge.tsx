import React from 'react';
import {
  INVESTMENT_CATEGORIES_TRANSLATIONS,
  INVESTMENT_CATEGORY_SCHEME_COLORS,
  InvestmentCategory,
} from '../../../constants/investment-category';
import { Badge } from '@chakra-ui/react';

interface Props {
  category: InvestmentCategory;
}

const InvestmentCategoryBadge = ({ category }: Props) => {
  return (
    <Badge
      colorScheme={INVESTMENT_CATEGORY_SCHEME_COLORS[category]}
      variant="solid"
      p={1}
    >
      {INVESTMENT_CATEGORIES_TRANSLATIONS[category]}
    </Badge>
  );
};

export default InvestmentCategoryBadge;
