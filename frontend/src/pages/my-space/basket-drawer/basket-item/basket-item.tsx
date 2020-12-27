import { Box, Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { MAIN_ROUTES } from '../../../main.routes';
import { MY_SPACE_ROUTES } from '../../my-space.routers';

interface Props {
  createdDate: string;
  name: string;
  description: string;
  id: number;
  isSelected?: boolean;
  onDelete: (basketId: number) => void;
  onEdit: (basketId: number) => void;
}

const BasketItem = ({
  description,
  createdDate,
  name,
  id,
  onEdit,
  onDelete,
  isSelected,
}: Props) => {
  const to = generatePath(
    MAIN_ROUTES.MY_SPACE + MY_SPACE_ROUTES.BASKET_DETAILS,
    {
      basketId: id,
    },
  );

  const handleOnDelete = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    onDelete(id);
  };

  const handleOnEdit = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    onEdit(id);
  };

  return (
    <Box display="block" as={Link} mb={4} to={to}>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={2}
        background={isSelected ? 'gray.100' : 0}
      >
        <Box
          mt="1"
          fontWeight="semibold"
          as="h3"
          lineHeight="tight"
          fontSize="large"
          isTruncated
        >
          {name}
        </Box>
        <Box py={1} fontSize="medium">
          {description}
        </Box>
        <Flex>
          <Box>
            <Icon as={FaEdit} onClick={handleOnEdit} mr={1} aria-label="edit">
              Edit
            </Icon>
            <Icon
              as={FaTrash}
              onClick={handleOnDelete}
              mr={1}
              aria-label="delete"
            >
              Delete
            </Icon>
          </Box>
          <Box as="span" color="gray.600" fontSize="sm" ml="auto">
            {formatDistanceToNow(new Date(createdDate), { addSuffix: true })}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default React.memo(BasketItem);
