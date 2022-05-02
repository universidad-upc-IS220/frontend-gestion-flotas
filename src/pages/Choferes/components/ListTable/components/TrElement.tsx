import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { ChoferProps } from '../../../../../models';
import { DrawerDetail } from '../../DrawerDetail';
import { RiUserStarLine } from 'react-icons/ri';
import { RiUserUnfollowLine } from 'react-icons/ri';

const TrElement = ({ item }: { item: ChoferProps }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField: any = React.useRef();

  /* const formatDate = (date: string) => {
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }; */

  const openDrawer = () => {
    console.log('click');
  };

  return (
    <>
      <Tr bg="white">
        <Td h="64px" padding="11.5px 20px">
          {item.id}
        </Td>
        <Td h="64px" padding="11.5px 20px">
          <Text>{item.nombres}</Text>
        </Td>
        <Td h="64px" padding="11.5px 20px">
          {item.apellidos}
        </Td>
        <Td h="64px" padding="11.5px 20px">
          {item.fecha_nacimiento}
        </Td>
        <Td h="64px" padding="11.5px 20px">
          {item.nro_documento}
        </Td>
        <Td h="64px" padding="11.5px 20px">
          {item.telefono}
        </Td>
        <Td h="64px" padding="11.5px 20px" textAlign={'center'}>
          {item.estado ? (
            <Icon color={'green.400'} w="24px" h="24px" as={RiUserStarLine} />
          ) : (
            <Icon color={'red.500'} w="24px" h="24px" as={RiUserUnfollowLine} />
          )}
        </Td>

        <Td h="64px" padding="11.5px 20px">
          <IconButton
            color="#28cc9e"
            onClick={() => {
              onOpen();
            }}
            bg={'transparent'}
            _hover={{ bg: 'rgba(243, 115, 32, 0.05)' }}
            aria-label="Ver detalle"
            size="md"
            fontSize="22px"
            icon={<IoIosArrowForward />}
          />
          <DrawerDetail
            choferDetails={item}
            isOpen={isOpen}
            onClose={onClose}
            firstField={firstField}
          />
        </Td>
      </Tr>
    </>
  );
};

export default TrElement;
