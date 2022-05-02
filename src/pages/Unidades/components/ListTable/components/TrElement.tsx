import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr
} from '@chakra-ui/react';
import { IoIosArrowForward } from 'react-icons/io';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { VscError } from 'react-icons/vsc';
import { UnidadProps } from '../../../../../models';

const TrElement = ({ item }: { item: UnidadProps }) => {
  /* const formatDate = (date: string) => {
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }; */

  return (
    <Tr bg="white">
      <Td h="64px" padding="11.5px 20px">
        {item.id}
      </Td>
      <Td h="64px" padding="11.5px 20px">
        <Text>{item.marca}</Text>
      </Td>
      <Td h="64px" padding="11.5px 20px">
        {item.modelo}
      </Td>
      <Td h="64px" padding="11.5px 20px">
        {item.color}
      </Td>
      <Td h="64px" padding="11.5px 20px">
        {item.kilometraje}
      </Td>
      <Td h="64px" padding="11.5px 20px">
        {item.nro_serie}
      </Td>
      <Td h="64px" padding="11.5px 20px" textAlign={'center'}>
        {item.estado ? (
          <Icon color={'green.400'} width="23px" h="23px" as={RiCheckboxCircleLine} />
        ) : (
          <Icon color={'red.500'} width="26px" h="26px" as={VscError} />
        )}
      </Td>

      <Td h="64px" padding="11.5px 20px">
        <IconButton
          color="#28cc9e"
          bg={'transparent'}
          _hover={{ bg: 'rgba(243, 115, 32, 0.05)' }}
          aria-label="Ver detalle"
          size="md"
          fontSize="22px"
          icon={<IoIosArrowForward />}
        />
      </Td>
    </Tr>
  );
};

export default TrElement;
