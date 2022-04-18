import { Tab, TabList, Tabs } from '@chakra-ui/react';

interface Props {}

export const NavigationTabs: React.FC<Props> = () => {
  return (
    <Tabs>
      <TabList color="#333333" mb={'30px'}>
        <Tab
          minW={'160px'}
          _selected={{
            fontWeight: '600',
            color: '#28cc9e',
            borderBottom: '4px solid #28cc9e'
          }}
          _focus={{ boxShadow: 'none' }}
          onClick={() => {}}
        >
          Tasas BAU
        </Tab>
      </TabList>
    </Tabs>
  );
};
