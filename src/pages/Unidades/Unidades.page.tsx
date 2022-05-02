import { API_BASE_URL } from '../../constants/global';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/Layout';
import { Box, Tabs, TabList, Tab } from '@chakra-ui/react';

// Own components
import { ListTable } from './components/ListTable';
import { Skeleton } from '../../components/Skeleton';

export const UnidadesPage = () => {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    ENVIADO: true,
    RECHAZADO: true,
    APROBADO: true,
    BORRADOR: false,
    DESESTIMADO: false
  });

  const [data, setData] = useState([]);
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

      const request = await fetch(`${API_BASE_URL}/api/unidades`);
      const response = await request.json();
      const formattedData = response.data.map((_item: any) => {
        return {
          id: _item.id,
          ..._item.attributes
        };
      });
      console.log('response', response);
      console.log('formatted data', formattedData);

      setData(formattedData);
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
          </TabList>
        </Tabs>
        {loading && <Skeleton />}
        {!loading && data.length > 0 && <ListTable data={data} />}
      </Box>
    </DashboardLayout>
  );
};
