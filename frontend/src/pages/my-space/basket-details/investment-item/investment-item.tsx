import React from 'react';
import { Badge, Box, Flex, Icon } from '@chakra-ui/react';
import { INVESTMENT_CATEGORIES_TRANSLATIONS } from '../../../../shared/constants/investment-category';
import { InvestmentResponseDto } from '../../../../core/api/api.types';
import InvestmentSummary from '../../../../shared/components/investment/investment-summary';
import { formatDistanceToNow } from 'date-fns';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Props {
  investment: InvestmentResponseDto;
  onEdit: (investmentId: number) => void;
  onDelete: (investmentId: number) => void;
}

const InvestmentItem = ({ investment, onEdit, onDelete }: Props) => {
  const investmentConfig = {
    startAmount: investment.startAmount,
    annualInterestRate: investment.annualInterestRate,
    yearsOfGrowth: investment.yearsOfGrowth,
    payment: investment.payment,
    paymentFrequency: investment.paymentFrequency,
    compoundFrequency: investment.compoundFrequency,
  };

  const handleOnEdit = () => {
    onEdit(investment.id);
  };

  const handleOnDelete = () => {
    onDelete(investment.id);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={2}
      mb={4}
    >
      <Badge>{INVESTMENT_CATEGORIES_TRANSLATIONS[investment.category]}</Badge>
      <InvestmentSummary config={investmentConfig} />
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
  );
};

export default React.memo(InvestmentItem);
