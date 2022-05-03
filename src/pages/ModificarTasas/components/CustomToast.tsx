import { Box, Icon, Text } from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';

type Props = {
  closeHandler: () => void;
};
export const CustomToast: React.FC<Props> = ({ closeHandler }) => {
  return (
    <Box
      color="#606162"
      p={'20px'}
      bg="white"
      h="152px"
      w="340px"
      borderTopLeftRadius={'8px'}
      borderBottomLeftRadius={'8px'}
      marginBottom="70px"
      boxShadow="-5px 0px 10px rgba(0, 0, 0, 0.1)"
      borderRight={'8px solid #06CA75'}
      position="relative"
      fontSize="16px"
    >
      <Icon
        top={'15px'}
        right={'15px'}
        position="absolute"
        height="14px"
        width="14px"
        as={GrClose}
        cursor="pointer"
        onClick={() => closeHandler()}
      />
      <Text mb="30px" fontWeight={'600'}>
        Cambios guardados
      </Text>
      <Text>Podrás retomar esta solicitud más tarde desde la pantalla de inicio.</Text>
    </Box>
  );
};
