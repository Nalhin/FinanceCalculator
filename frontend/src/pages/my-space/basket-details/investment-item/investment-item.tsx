import React from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { InvestmentResponseDto } from '../../../../core/api/api.types';
import InvestmentStatsSummary from '../../../../shared/components/investment/investment-stats-summary/investment-stats-summary';
import { formatDistanceToNow } from 'date-fns';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { generatePath, Link } from 'react-router-dom';
import { MAIN_ROUTES } from '../../../main.routes';
import { MY_SPACE_ROUTES } from '../../my-space.routers';
import InvestmentCategoryBadge from '../../../../shared/components/investment/investment-badges/investment-category-badge';
import InvestmentRiskBadge from '../../../../shared/components/investment/investment-badges/investment-risk-badge';

interface Props {
  investment: InvestmentResponseDto;
  onEdit: (investmentId: number) => void;
  onDelete: (investmentId: number) => void;
  basketId: number;
}

const InvestmentItem = ({ investment, onEdit, onDelete, basketId }: Props) => {
  const investmentConfig = {
    startAmount: investment.startAmount,
    annualInterestRate: investment.annualInterestRate,
    yearsOfGrowth: investment.yearsOfGrowth,
    payment: investment.payment,
    paymentFrequency: investment.paymentFrequency,
    compoundFrequency: investment.compoundFrequency,
  };

  const handleOnEdit = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    onEdit(investment.id);
  };

  const handleOnDelete = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    onDelete(investment.id);
  };

  const to = generatePath(
    MAIN_ROUTES.MY_SPACE + MY_SPACE_ROUTES.INVESTMENT_DETAILS,
    {
      basketId,
      investmentId: investment.id,
    },
  );

  return (
    <Box display="block" as={Link} mb={4} to={to}>
      <Box
        width="300px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={2}
        mb={4}
      >
        <Flex justify="space-between">
          <InvestmentCategoryBadge category={investment.category} />
          <InvestmentRiskBadge risk={investment.risk} />
        </Flex>
        <InvestmentStatsSummary config={investmentConfig} />
        <Flex>
          <Box>
            <Icon
              as={FaEdit}
              onClick={handleOnEdit}
              mr={1}
              aria-label="edit"
              cursor="pointer"
            >
              Edit
            </Icon>
            <Icon
              as={FaTrash}
              onClick={handleOnDelete}
              mr={1}
              aria-label="delete"
              cursor="pointer"
            >
              Delete
            </Icon>
          </Box>
          <Box as="span" color="gray.600" fontSize="sm" ml="auto">
            {formatDistanceToNow(new Date(investment.createdDate), {
              addSuffix: true,
            })}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default React.memo(InvestmentItem);
