import { Box, Flex, Grid, Heading, Button } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import Skeleton from '../../components/Skeleton';
import { BsDownload } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { SegmentoProps } from '../../types';

import { NavigationTabs } from './components/NavigationTabs';
import { Filters } from './components/Filters';
import { BAUDisplayTable } from '../../components/BAUDisplayTable';

import { useTasasData } from '../../hooks/useTasasData';

export const VisualizarTasas = () => {
  const navigate = useNavigate();
  const { loading, tasasData } = useTasasData();
  const [tablesData, setTablesData] = useState([]);
  const [segmentFilters, setSegmentFilters] = useState([]);

  const handleOnChange = (value: any) => {
    const filters = value.map((item: any) => item.value);
    const filteredData = tasasData.filter((tasa: SegmentoProps) => {
      return filters.indexOf(tasa.segmentoId) > -1;
    });
    setTablesData(filteredData);
  };

  useEffect(() => {
    setTablesData(tasasData);

    const tempFilters: any = tasasData.map((tasa: SegmentoProps) => {
      return {
        label: tasa.segmentoNombre,
        value: tasa.segmentoId,
        colorScheme: 'orange'
      };
    });
    setSegmentFilters(tempFilters);
  }, [tasasData]);

  return (
    <DashboardLayout title={'Tasas'} fullWidth={true} backToPage={'/dashboard'}>
      <Box>
        <NavigationTabs />
        <Box>
          <Flex alignItems={'center'} mb="24px">
            <Filters filtros={segmentFilters} handleOnChange={handleOnChange} />
            <Button
              bg="transparent"
              w="160px"
              ml="35px"
              size="lg"
              color="#28cc9e"
              fontWeight={500}
              leftIcon={<BsDownload color="#28cc9e" />}
              fontSize="16px"
              _hover={{
                bg: 'transparent'
              }}
            >
              Exportar
            </Button>
            <Button
              minWidth="160px"
              ml="20px"
              size="lg"
              bg="#28cc9e"
              color="#FFFFFF"
              fontWeight={500}
              fontSize="16px"
              _hover={{
                bg: '#28cc9e'
              }}
              onClick={() => navigate('/modificar-tasas')}
            >
              Modificar tasas
            </Button>
          </Flex>
          <Grid templateColumns="repeat(2, 1fr)" gap="40px 16px">
            {tablesData.length > 0 &&
              tablesData.map((tasa: SegmentoProps, index) => (
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
          {loading && <Skeleton />}
        </Box>
      </Box>
    </DashboardLayout>
  );
};
