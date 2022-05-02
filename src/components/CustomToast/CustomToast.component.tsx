import { Box, Icon, Text } from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';
import { ComponentProps } from './models';

export const CustomToastComponent: React.FC<ComponentProps> = ({
  type = 'info',
  closeHandler,
  title,
  message
}) => {
  let color = 'blue';
  switch (type) {
    case 'error':
      color = 'red';
      break;
    case 'info':
      color = 'blue';
      break;
    case 'warning':
      color = 'yellow';
      break;
    case 'success':
      color = '#06CA75';
      break;
    default:
      color = 'blue';
      break;
  }
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
      borderRight={`8px solid ${color}`}
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
        {title}
      </Text>
      <Text>{message}</Text>
    </Box>
  );
};
