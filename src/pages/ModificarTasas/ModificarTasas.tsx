import { Heading, Box, Grid, Button } from '@chakra-ui/react';
import { DashboardLayout } from '../../components/Layout/index';
import { useEffect, useState } from 'react';
import { NavigationTabs } from './components/NavigationTabs';
import { useTasasData } from '../../hooks/useTasasData';
import { BAUDisplayTable } from '../../components/BAUDisplayTable/BAUDisplayTable';
import { SegmentoProps } from '../../types';
import { BAUEditingTable } from '../../components/BAUEditingTable';

type ComponentProps = {};

export const ModificarTasas: React.FC<ComponentProps> = ({}) => {
  const { loading, tasasData } = useTasasData();
  const [tablesData, setTablesData] = useState([]);
  const [existChanges, setExistChanges] = useState<Boolean>(false);

  const handleChanges = (existsChanges: Boolean) => {
    console.log('changed?', existsChanges);
    setExistChanges(existsChanges);
  };
  useEffect(() => {
    setTablesData(tasasData);
  }, [tasasData]);

  return (
    <DashboardLayout title={'Solicitud de modificación'} fullWidth={true} backToPage={'/tasas'}>
      <NavigationTabs />
      <Box>
        <Grid templateColumns="repeat(1, 1fr)" gap="40px 0">
          {tablesData.length > 0 &&
            tablesData.map((tasa: SegmentoProps, index) => (
              <Grid templateColumns="repeat(2, 1fr)" gap="0 16px" key={tasa.segmentoNombre}>
                <Box>
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
                  <BAUEditingTable tasa={tasa} handleChanges={handleChanges} />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box
        position="fixed"
        left="0"
        bottom={0}
        h="64px"
        backgroundColor="#FFF"
        w="100%"
        boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1);"
        padding="0 68px"
      >
        <Box display="flex" justifyContent="right" alignItems={'center'} h="100%">
          <Button
            color="#28cc9e"
            size="md"
            marginRight="auto"
            bg="#FFF"
            w="184px"
            h="48px"
            borderRadius="8px"
          >
            Descartar solicitud
          </Button>
          <Button
            marginRight="16px"
            disabled={!existChanges}
            bg="#FFF"
            w="100px"
            h="48px"
            fontWeight={'normal'}
            border="1px solid #28cc9e"
            color="#28cc9e"
            _hover={{
              _disabled: {
                cursor: 'not-allowed',
                bg: '#FFF',
                color: '#9B9B9B'
              }
            }}
            _disabled={{
              border: '1px solid #9B9B9B',
              bg: '#FFF',
              color: '#9B9B9B'
            }}
          >
            Guardar
          </Button>
          <Button
            disabled={!existChanges}
            borderRadius="8px"
            color="#FFF"
            bg="#28cc9e"
            w="276px"
            h="48px"
            fontWeight={'normal'}
            _hover={{
              _disabled: {
                cursor: 'not-allowed',
                bg: '#9B9B9B',
                color: '#FFF'
              }
            }}
            _disabled={{
              bg: '#9B9B9B',
              color: '#FFF'
            }}
          >
            Enviar solicitud de modificación
          </Button>
        </Box>
      </Box>
    </DashboardLayout>
  );
};
