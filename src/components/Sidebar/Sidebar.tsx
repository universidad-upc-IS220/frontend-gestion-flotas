import { useContext } from 'react';
import { ItemProps } from './types';

import React from 'react';
import { Box, Circle, Flex, Text, Icon } from '@chakra-ui/react';

// Utils
import { capitalize } from '../../utils/textTransform';

// Assets
import { ReactComponent as TASAS_ICON } from '../../assets/icon_dashboard_tasas.svg';
import { ReactComponent as HOME_ICON } from '../../assets/icon_dashboard_home.svg';
import { AiOutlineHome } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';

// Contexts
import { UserContext } from '../../contexts/userContext';

// Components
import LinkSidebar from './components/LinkSiderbar';

const RoutesList: ItemProps[] = [
  {
    id: 1,
    text: 'Unidades',
    active: window.location.hash === '#/dashboard',
    url: '/dashboard',
    icon: ({ fill }) => <Icon as={AiOutlineHome} />
  },
  {
    id: 2,
    text: 'Choferes',
    active: window.location.hash === '#/choferes',
    url: '/choferes',
    icon: ({ fill }) => <Icon as={FiUsers} />
  }
];

export default function Sidebar() {
  const { userData } = useContext(UserContext);
  const userName = userData.userName ? capitalize(userData.userName.split(' ')[0]) : 'Anónimo';

  return (
    <Box h="calc(100vh - 60px)" pt="20px" position="sticky" top="60px">
      <Flex alignItems="center" mb="23px" pl="1rem">
        <Circle size="40px" bg="teal" color="white" marginRight="10px">
          {userName.slice(0, 1)}
        </Circle>
        <Text color="gray.900" fontWeight="600" fontSize="14px">
          Hola, {userName}
        </Text>
      </Flex>
      {RoutesList.map((element: ItemProps) => (
        <LinkSidebar item={element} key={element.id} />
      ))}
    </Box>
  );
}
