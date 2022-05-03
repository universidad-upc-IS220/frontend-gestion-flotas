import { API_BASE_URL } from '../../constants/global';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { Box, Tabs, TabList, Tab } from '@chakra-ui/react';

// Own components
import { ListTable } from './components/ListTable';
import { Skeleton } from '../../components/Skeleton';

export const UnidadesPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [estado, setEstado] = useState(true);

  const filteredData = data.filter((item: any) => item.estado === estado);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const request = await fetch(`${API_BASE_URL}/api/unidades`);
      const response = await request.json();
      const formattedData = response.data.map((_item: any) => {
        return {
          id: _item.id,
          ..._item.attributes
        };
      });
      setData(formattedData);
      setLoading(false);
    }

    getData();
  }, []);

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
              onClick={() => setEstado(true)}
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
              onClick={() => setEstado(false)}
            >
              Inhabilitados
            </Tab>
          </TabList>
        </Tabs>
        {loading && <Skeleton />}
        {!loading && data.length > 0 && <ListTable data={filteredData} />}
      </Box>
    </DashboardLayout>
  );
};
