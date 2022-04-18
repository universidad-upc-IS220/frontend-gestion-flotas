import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Badge,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  ButtonProps,
  Text,
  Icon,
  Flex
} from '@chakra-ui/react';
import { Paginator, Container, Previous, usePaginator, Next, PageGroup } from 'chakra-paginator';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import TrElement from './components/TrElement';
import ThElement from './components/ThElement';

import { UnidadProps, ChoferProps } from '../../../../types';

function TablaChoferes({ data }: { data: ChoferProps[] }) {
  const itemsPerPage = 10;
  const outerLimit = 2;
  const innerLimit = 2;

  const {
    isDisabled,
    pagesQuantity,
    currentPage,
    setCurrentPage,
    offset // you may not need this most of the times, but it's returned for you anyway
  } = usePaginator({
    total: data.length,
    initialState: {
      pageSize: itemsPerPage,
      currentPage: 1,
      isDisabled: false
    }
  });

  const normalStyles: ButtonProps = {
    h: '32px',
    w: '32px',
    marginX: '4px',
    fontSize: 'sm',
    bg: 'transparent',
    border: '1px solid orange',
    variant: 'unstyled',
    color: 'gray.900',
    textAlign: 'center',
    lineHeight: '32px',
    _hover: {
      bg: 'orange.300'
    }
  };

  const activeStyles: ButtonProps = {
    h: '32px',
    w: '32px',
    marginX: '4px',
    bg: '#28cc9e',
    fontSize: 'sm',
    color: 'white',
    textAlign: 'center',
    lineHeight: '32px',
    _hover: {
      bg: 'orange.300'
    }
  };

  const separatorStyles: ButtonProps = {
    w: 10,
    bg: 'green.200'
  };

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  return (
    <Box borderRadius="10px" overflow="hidden">
      <Table size="lg" color="#34373C" fontSize="14px">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr bg="#F2F1F1">
            <ThElement key={1} text={'Id'} />
            <ThElement key={2} text={'Nombres'} />
            <ThElement key={3} text={'Apellidos'} />
            <ThElement key={4} text={'F. Nacimiento'} />
            <ThElement key={5} text={'N° Documento'} />
            <ThElement key={6} text={'Teléfono'} />
            <ThElement key={7} text={'Estado'} />
            <ThElement key={8} text={''} />
          </Tr>
        </Thead>
        <Tbody>
          {data.slice(offset, offset + itemsPerPage).map((item: ChoferProps, index) => (
            <TrElement item={item} key={index} />
          ))}
        </Tbody>
      </Table>
      <Box>
        <Paginator
          isDisabled={isDisabled}
          activeStyles={activeStyles}
          innerLimit={innerLimit}
          currentPage={currentPage}
          outerLimit={outerLimit}
          normalStyles={normalStyles}
          separatorStyles={separatorStyles}
          pagesQuantity={pagesQuantity}
          onPageChange={handlePageChange}
        >
          <Container align="center" justify="center" w="full" p={4}>
            <Previous>
              <Icon as={IoIosArrowBack} />
            </Previous>
            <PageGroup isInline align="center" />
            <Next>
              <Icon as={IoIosArrowForward} />
            </Next>
          </Container>
        </Paginator>
      </Box>
    </Box>
  );
}

export default TablaChoferes;
