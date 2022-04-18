import { ItemProps } from './types';

import { Box, Circle, Flex, Icon, Text } from '@chakra-ui/react';

import { useAuth } from '../../hooks';
import { capitalize } from '../../utils/textTransform';

// Assets
import { ReactComponent as TASAS_ICON } from '../../assets/icon_dashboard_tasas.svg';
import { ReactComponent as HOME_ICON } from '../../assets/icon_dashboard_home.svg';
import { HiDocumentText } from 'react-icons/hi';
import { RiUser6Line } from 'react-icons/ri';
import { AiFillCar } from 'react-icons/ai';
import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';

// Components
import LinkSidebar from './components/LinkSiderbar';

const RoutesList: ItemProps[] = [
  {
    id: 1,
    text: 'Unidades',
    active: window.location.hash === '#/dashboard',
    url: '/dashboard',
    // icon: ({ fill }) => <HOME_ICON fill={fill} />
    icon: ({ fill }) => <Icon as={AiFillCar} w="24px" h="24px" />
  },
  {
    id: 2,
    text: 'Choferes',
    active: window.location.hash === '#/choferes',
    url: '/choferes',
    icon: ({ fill }) => <Icon as={RiUser6Line} w="24px" h="24px" />
  },
  {
    id: 3,
    text: 'Papeleta',
    active: window.location.hash === '#/papeleta',
    url: '/papeleta',
    icon: ({ fill }) => <Icon as={HiDocumentText} w="24px" h="24px" />
  }
];

export default function Sidebar() {
  const [token] = useAuth();
  const { user } = useContext(AuthContext);

  let userName = user.name ? capitalize(user.name.split(' ')[0]) : 'Anónimo';

  return (
    <Box h="calc(100vh - 60px)" pt="20px" position="sticky" top="60px">
      <Flex alignItems="center" mb="23px" pl="1rem">
        <Circle size="40px" bg="#28cc9e" color="white" marginRight="10px">
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
