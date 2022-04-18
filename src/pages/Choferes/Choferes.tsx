import { API_BASE_URL } from '../../constants/global';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { Box, Tabs, TabList, Tab, Text, Flex, Checkbox, Stack, Progress } from '@chakra-ui/react';

// Own components
import TablaUnidades from './components/TablaUnidades';

export const Choferes = () => {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    ENVIADO: true,
    RECHAZADO: true,
    APROBADO: true,
    BORRADOR: false,
    DESESTIMADO: false
  });

  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('enviados');

  useEffect(() => {
    async function getData() {
      const states = Object.keys(filters).map((item: string) => {
        // @ts-ignore
        if (filters[item]) {
          return item;
        }
      });
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/choferes`);

      // const response = await fetch(`${API_BASE_URL}/v1/solicitudes?estados=${states.join(',')}`);
      const data = await response.json();
      console.log('unidades', data);

      setRequests(data);
      setLoading(false);
    }

    getData();
  }, [activeTab, filters]);

  return (
    <DashboardLayout title={'Choferes'}>
      <Box>
        <Tabs>
          <TabList color="#333333" mb={'30px'}>
            <Tab
              isDisabled={loading}
              minW={'160px'}
              _selected={{
                fontWeight: '600',
                color: '#28cc9e',
                borderBottom: '4px solid #28cc9e'
              }}
              _focus={{ boxShadow: 'none' }}
              onClick={() => {
                setActiveTab('all');
                setFilters({
                  ENVIADO: true,
                  RECHAZADO: true,
                  APROBADO: true,
                  BORRADOR: false,
                  DESESTIMADO: false
                });
              }}
            >
              Habilitados
            </Tab>
            <Tab
              isDisabled={loading}
              minW={'160px'}
              _selected={{
                fontWeight: '600',
                color: '#28cc9e',
                borderBottom: '4px solid #28cc9e'
              }}
              _focus={{ boxShadow: 'none' }}
              onClick={() => {
                setActiveTab('pendientes');
                setFilters({
                  ENVIADO: false,
                  RECHAZADO: false,
                  APROBADO: false,
                  BORRADOR: true,
                  DESESTIMADO: false
                });
              }}
            >
              Inhabilitados
            </Tab>
            {/* <Tab
              isDisabled={loading}
              minW={'160px'}
              _selected={{
                fontWeight: '600',
                color: '#28cc9e',
                borderBottom: '4px solid #28cc9e'
              }}
              _focus={{ boxShadow: 'none' }}
              onClick={() => {
                setActiveTab('desestimados');
                setFilters({
                  ENVIADO: false,
                  RECHAZADO: false,
                  APROBADO: false,
                  BORRADOR: false,
                  DESESTIMADO: true
                });
              }}
            >
              Desestimadas
            </Tab> */}
          </TabList>
        </Tabs>

        {/* {activeTab === 'enviados' && (
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
                  setFilters({
                    ...filters,
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
                  setFilters({
                    ...filters,
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
                  setFilters({
                    ...filters,
                    RECHAZADO: event.target.checked
                  });
                }}
              >
                <Text fontSize="16px">Rechazadas</Text>
              </Checkbox>
            </Flex>
          </Flex>
        )} */}

        {!loading ? (
          <TablaUnidades data={requests} />
        ) : (
          <Stack>
            <Progress
              size="md"
              isIndeterminate
              colorScheme={'gray'}
              height={'64px'}
              opacity={0.04}
            />
            <Progress
              size="md"
              isIndeterminate
              colorScheme={'gray'}
              height={'64px'}
              opacity={0.06}
            />
            <Progress
              size="md"
              isIndeterminate
              colorScheme={'gray'}
              height={'64px'}
              opacity={0.07}
            />
            <Progress
              size="md"
              isIndeterminate
              colorScheme={'gray'}
              height={'64px'}
              opacity={0.05}
            />
            <Progress
              size="md"
              isIndeterminate
              colorScheme={'gray'}
              height={'64px'}
              opacity={0.09}
            />
          </Stack>
        )}
      </Box>
    </DashboardLayout>
  );
};
