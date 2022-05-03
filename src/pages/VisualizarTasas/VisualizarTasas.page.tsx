import { Box, Flex, Grid, Heading, Button, useDisclosure } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { Skeleton } from '../../components/Skeleton';
import { BsDownload } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { SegmentoProps, SolicitudProps } from '../../models';

import { NavigationTabs } from './components/NavigationTabs';
import { Filters } from './components/Filters';
import { BAUDisplayTable } from '../../components/BAUDisplayTable';

import { API_BASE_URL } from '../../constants/global';
import { ModalAlert } from '../../components/ModalAlert';

// Utils
import { useFetch } from '../../hooks/useFetch';

export const VisualizarTasasPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modifyTasa, setModifyTasa] = useState(false);

  const { response: responseSolicitudes, loading: loadingSolicitudes } = useFetch(
    `${API_BASE_URL}/v1/solicitudes`
  );
  const { response: responseTasaBau, loading: loadingTasasBau } = useFetch(
    `${API_BASE_URL}/v1/tasas/bau`
  );
  // console.log('solicitudes', responseSolicitudes);

  const [gridData, setGridData] = useState(responseTasaBau || []);

  const [segmentFilters, setSegmentFilters] = useState([]);

  const handleOnChange = (value: any) => {
    const filters = value.map((item: any) => item.value);
    const filteredData = responseTasaBau.filter((tasa: SegmentoProps) => {
      return filters.indexOf(tasa.segmentoId) > -1;
    });
    setGridData(filteredData);
  };
  const handleCreateRequest = () => {
    if (modifyTasa) {
      navigate('/modificar-tasas');
    } else {
      onOpen();
    }
  };

  // console.log('>>>>>', loadingTasasBau);

  useEffect(() => {
    // const getSolicitudes = async () => {
    // const { response: responseSolicitudes } = useFetch(`${API_BASE_URL}/v1/solicitudes`);

    // const response = await fetch(`${API_BASE_URL}/v1/solicitudes`);
    // const data = await response.json();
    // console.log('===>', data);
    if (true) {
      // setmodifyTasa(false);
    } else {
      // setmodifyTasa(true);
    }
    // }
    // getData();
    // setTablesData(tasasData);

    // TasasBau datavalidation
    if (responseTasaBau?.length) {
      const initialSegmentOptions: any = responseTasaBau.map((segment: SegmentoProps) => ({
        label: segment.segmentoNombre,
        value: segment.segmentoId,
        colorScheme: 'orange'
      }));
      setGridData(responseTasaBau);
      setSegmentFilters(initialSegmentOptions);
    }

    // Solicitudes data validation
    if (responseSolicitudes?.length) {
      const hasPendingOperations = responseSolicitudes.find(
        (solicitud: SolicitudProps) =>
          solicitud.estado === 'ENVIADO' || solicitud.estado === 'BORRADOR'
      )
        ? true
        : false;
      setModifyTasa(!hasPendingOperations);
    }
  }, [responseTasaBau, responseSolicitudes]);

  return (
    <DashboardLayout title={'Tasas'} fullWidth={true} backToPage={'/dashboard'}>
      <Box>
        <NavigationTabs />
        <ModalAlert
          isOpen={isOpen}
          onClose={onClose}
          confirm={() => {
            onClose();
          }}
        />
        <Box>
          <Flex alignItems={'center'} mb="24px">
            <Filters filtros={segmentFilters} handleOnChange={handleOnChange} />
            <Button
              bg="transparent"
              w="160px"
              ml="35px"
              size="lg"
              color="teal"
              fontWeight={500}
              leftIcon={<BsDownload color="teal" />}
              fontSize="16px"
              _hover={{
                bg: 'transparent'
              }}
            >
              Exportar
            </Button>
            <Button
              isLoading={loadingSolicitudes}
              minWidth="160px"
              ml="20px"
              size="lg"
              bg="teal"
              color="#FFFFFF"
              fontWeight={500}
              fontSize="16px"
              _hover={{
                bg: 'teal'
              }}
              onClick={() => handleCreateRequest()}
            >
              Modificar tasas
            </Button>
          </Flex>
          <Grid templateColumns="repeat(2, 1fr)" gap="40px 16px">
            {gridData &&
              gridData.length > 0 &&
              gridData.map((tasa: SegmentoProps) => (
                <Box key={tasa.segmentoNombre}>
                  <Heading
                    as={'h2'}
                    size="sm"
                    color="#606162"
                    fontSize="16px"
                    mb="16px"
                    fontWeight={500}
                  >
                    {tasa.segmentoNombre}
                  </Heading>
                  <BAUDisplayTable tasa={tasa} />
                </Box>
              ))}
          </Grid>
          {loadingTasasBau && <Skeleton />}
        </Box>
      </Box>
    </DashboardLayout>
  );
};
