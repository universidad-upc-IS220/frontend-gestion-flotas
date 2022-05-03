import LOGO from '../../assets/logo_gestion_flotas.png';
import LOGOUT_ICON from '../../assets/icon_power.svg';
import BELL_ICON from '../../assets/icon_bell.svg';
import { Box, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { useContext } from 'react';
import { types } from '../../models';

import { UserContext } from '../../contexts/userContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { userLogout } = useContext(UserContext);
  const { dispatch } = useContext(AuthContext);

  const logOut = () => {
    userLogout();
    navigate('/');
    // dispatch({ type: types.logout });
    // removeToken();
  };

  return (
    <Box
      position="sticky"
      zIndex={999}
      top={'0'}
      bg={'white'}
      boxShadow="1px 1px 16px -5px rgba(0,0,0,0.24)"
      borderColor="#c4c4c4"
      h="60px"
      d="flex"
      justifyContent="space-between"
      px="20px"
    >
      <Box h="100%" d="flex" alignItems="center">
        <Image
          src={LOGO}
          alt="logo"
          h="36px"
          cursor="pointer"
          onClick={() => navigate('/dashboard')}
        />
      </Box>
      <Box d="flex" h="100%" alignItems="center">
        <Image src={BELL_ICON} alt="" w="30px" h="30px" mr="20px" />
        <Image
          src={LOGOUT_ICON}
          alt=""
          w="30px"
          h="30px"
          mr="20px"
          onClick={() => logOut()}
          cursor="pointer"
          _hover={{
            opacity: 0.6
          }}
        />
      </Box>
    </Box>
  );
}
