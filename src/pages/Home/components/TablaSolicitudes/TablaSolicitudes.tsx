import { Box, Table, Thead, Tbody, Tr, ButtonProps, Icon, useDisclosure } from '@chakra-ui/react';
import { Paginator, Container, Previous, usePaginator, Next, PageGroup } from 'chakra-paginator';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import TrElement from './components/TrElement';
import ThElement from './components/ThElement';
import { ModalMessageGlobal } from '../../../../components/ModalMessage';

import { SolicitudProps } from '../../../../models';
import { useState } from 'react';
import { useFetch } from '../../../../hooks/useFetch';
import { API_BASE_URL } from '../../../../constants/global';

interface Props {
  data: SolicitudProps[];
}

const TablaSolicitudes: React.FC<Props> = ({ data }) => {
  const { doFetch, loading } = useFetch(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idToRemove, setIdToRemove] = useState<number | null>(null);
  const [loaderConfirmation, setLoaderConfirmation] = useState(false);

  const itemsPerPage = 10;
  const outerLimit = 2;
  const innerLimit = 2;

  const {
    isDisabled,
    pagesQuantity,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    pageSize,
    setPageSize,
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
    bg: 'teal',
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

  const openModalConfirmation = (id: number) => {
    setIdToRemove(id);
    onOpen();
  };

  const closeModalConfirmation = async () => {
    setLoaderConfirmation(true);
    const res = await doFetch(`${API_BASE_URL}/v1/solicitudes/${idToRemove}/desestimar`, {
      method: 'PATCH'
    });
    if (res?.solicitudId) {
      setTimeout(() => {
        setLoaderConfirmation(false);
      }, 1000);

      window.location.reload();
    } else {
      setLoaderConfirmation(false);
    }
  };

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  return (
    <Box borderRadius="10px" overflow="hidden">
      <ModalMessageGlobal
        isOpen={isOpen}
        onClose={onClose}
        confirm={() => closeModalConfirmation()}
        title={'¿Querés desestimar la solicitud?'}
        description={'Perderás todo el progreso que hayas realizado hasta el momento'}
      />
      <Table size="lg" color="#34373C" fontSize="14px">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr bg="#F2F1F1">
            <ThElement key={1} text={'N° de Solicitud'} />
            <ThElement key={2} text={'Fecha de modificación'} />
            <ThElement key={3} text={'Responsable'} />
            <ThElement key={4} text={'Estado'} />
            <ThElement key={5} text={''} />
          </Tr>
        </Thead>
        <Tbody>
          {data.slice(offset, offset + itemsPerPage).map((item, index) => (
            <TrElement item={item} key={index} openModalConfirmation={openModalConfirmation} />
          ))}
        </Tbody>
      </Table>
      <Box>
        {data?.length > 0 && (
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
        )}
      </Box>
    </Box>
  );
};

export default TablaSolicitudes;
