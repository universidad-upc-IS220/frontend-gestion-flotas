import { IconButton, Menu, MenuButton, MenuItem, MenuList, Td, Text, Tr } from '@chakra-ui/react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import TagElement from './TagElement';

import { UnidadProps, ChoferProps } from '../../../../../types';

const TrElement = ({ item }: { item: ChoferProps }) => {
  console.log('item', item);

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
        <Text>{item.nombre}</Text>
      </Td>
      <Td h="64px" padding="11.5px 20px">
        {item.apellido}
      </Td>
      <Td h="64px" padding="11.5px 20px">
        {item.fecha_nacimiento}
        {/* <TagElement estado={item.modelo} /> */}
      </Td>
      <Td h="64px" padding="11.5px 20px">
        {item.nro_documento}
        {/* <TagElement estado={item.modelo} /> */}
      </Td>
      <Td h="64px" padding="11.5px 20px">
        {item.telefono}
        {/* <TagElement estado={item.modelo} /> */}
      </Td>
      <Td h="64px" padding="11.5px 20px">
        {item.estado}
        {/* <TagElement estado={item.modelo} /> */}
      </Td>

      <Td h="64px" padding="11.5px 20px">
        {/* {item.estado === 'RECHAZADO' ? (
          <Menu>
            <MenuButton
              bg="transparent"
              color="#28cc9e"
              fontSize="22px"
              _hover={{ bg: 'transparent' }}
              _active={{ bg: 'rgba(243, 115, 32, 0.05)' }}
              as={IconButton}
              icon={<HiOutlineDotsVertical />}
            />

            <MenuList>
              <MenuItem>Ver detalle</MenuItem>
              <MenuItem>Desestimar</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <IconButton
            color="#28cc9e"
            bg={'transparent'}
            _hover={{ bg: 'rgba(243, 115, 32, 0.05)' }}
            aria-label="Ver detalle"
            size="md"
            fontSize="22px"
            icon={<IoIosArrowForward />}
          />
        )} */}
      </Td>
    </Tr>
  );
};

export default TrElement;
