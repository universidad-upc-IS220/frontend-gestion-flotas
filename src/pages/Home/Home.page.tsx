import { API_BASE_URL } from '../../constants/global';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { Box, Tabs, TabList, Tab, Text, Flex, Checkbox } from '@chakra-ui/react';

// Own components
import TablaSolicitudes from './components/TablaSolicitudes';
import { Skeleton } from '../../components/Skeleton';
import { useFetch } from '../../hooks/useFetch';
import { SolicitudProps } from '../../models';

interface StateFilterProps {
  [key: string]: boolean;
}

export const HomePage: React.FC = () => {
  const { response: resSolicitudes, loading, error } = useFetch(`${API_BASE_URL}/v1/solicitudes`);
  const [tableData, setTableData] = useState([]);

  const err = !!(error || (resSolicitudes?.codigo && resSolicitudes?.codigo === '500'));

  const [stateFilter, setStateFilter] = useState<StateFilterProps>({
    ENVIADO: true,
    RECHAZADO: true,
    APROBADO: true,
    BORRADOR: true
  });
  const [activeTab, setActiveTab] = useState('ENVIADO');

  useEffect(() => {
    if (resSolicitudes?.length) {
      const filteredTableData = resSolicitudes?.filter(
        (solicitud: SolicitudProps) => stateFilter[solicitud.estado]
      );
      setTableData(filteredTableData);
    }
  }, [resSolicitudes, stateFilter]);

  return (
    <DashboardLayout title={'Solicitudes de aprobación'}>
      <Box>
        <Tabs>
          <TabList color="#333333" mb={'30px'}>
            <Tab
              isDisabled={loading}
              minW={'160px'}
              _selected={{
                fontWeight: '600',
                color: 'teal',
                borderBottom: '4px solid teal'
              }}
              _focus={{ boxShadow: 'none' }}
              onClick={() => {
                setActiveTab('ENVIADO');
                setStateFilter({
                  ENVIADO: true,
                  RECHAZADO: true,
                  APROBADO: true,
                  BORRADOR: true
                });
              }}
            >
              Enviadas
            </Tab>
          </TabList>
        </Tabs>

        {activeTab === 'ENVIADO' && (
          // <StateFilter />
          <Flex mb="28px">
            <Text fontWeight={500} color="#606162">
              Estados:
            </Text>
            <Flex color="#333333" fontSize={'16px'} ml="15px">
              <Checkbox
                isDisabled={loading}
                size="lg"
                colorScheme="brand"
                defaultChecked
                mr="20px"
                onChange={(event) => {
                  setStateFilter({
                    ...stateFilter,
                    ENVIADO: event.target.checked
                  });
                }}
              >
                <Text fontSize="16px">Pendientes de aprobación</Text>
              </Checkbox>
              <Checkbox
                isDisabled={loading}
                size="lg"
                colorScheme="brand"
                defaultChecked
                mr="20px"
                onChange={(event) => {
                  setStateFilter({
                    ...stateFilter,
                    APROBADO: event.target.checked
                  });
                }}
              >
                <Text fontSize="16px">Aprobadas</Text>
              </Checkbox>
              <Checkbox
                isDisabled={loading}
                size="lg"
                colorScheme="brand"
                defaultChecked
                mr="20px"
                onChange={(event) => {
                  setStateFilter({
                    ...stateFilter,
                    RECHAZADO: event.target.checked
                  });
                }}
              >
                <Text fontSize="16px">Rechazadas</Text>
              </Checkbox>
            </Flex>
          </Flex>
        )}

        {loading && <Skeleton />}
        {!loading && !err && <TablaSolicitudes data={tableData} />}
      </Box>
    </DashboardLayout>
  );
};
