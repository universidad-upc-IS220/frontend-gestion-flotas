import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
  Spinner
} from '@chakra-ui/react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import TagElement from './TagElement';

import { SolicitudProps } from '../../../../../models';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../../contexts/userContext';
import { useContext, useState } from 'react';
interface ComponentProps {
  item: SolicitudProps;
  openModalConfirmation: (id: number) => void;
}

const TrElement: React.FC<ComponentProps> = ({ item, openModalConfirmation }) => {
  const { userData } = useContext(UserContext);

  const navigate = useNavigate();
  const formatDate = (date: string) => {
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const retomarSolicitud = async (id: number) => {
    navigate({
      pathname: '/modificar-tasas',
      search: createSearchParams({
        solicitud_id: id.toString()
      }).toString()
    });
  };

  const desestimarHandler = async (id: number) => {
    openModalConfirmation(id);
  };

  return (
    <Tr bg="white">
      <Td h="64px" padding="11.5px 20px">
        {item.id}
      </Td>
      <Td h="64px" padding="11.5px 20px">
        <Text>{formatDate(item.fechaModificacion)}</Text>
      </Td>
      <Td h="64px" padding="11.5px 20px">
        {item.responsable}
      </Td>
      <Td h="64px" padding="11.5px 20px">
        <TagElement estado={item.estado} />
      </Td>
      <Td h="64px" padding="11.5px 20px" display="inline-flex" alignItems={'center'}>
        {item.estado === 'RECHAZADO' && (
          <Menu>
            <MenuButton
              bg="transparent"
              color="teal"
              fontSize="22px"
              _hover={{ bg: 'transparent' }}
              _active={{ bg: 'rgba(243, 115, 32, 0.05)' }}
              as={IconButton}
              icon={<HiOutlineDotsVertical />}
            />

            <MenuList>
              <MenuItem>Ver detalle</MenuItem>
              <MenuItem onClick={() => openModalConfirmation(item.id)}>Desestimar</MenuItem>
            </MenuList>
          </Menu>
        )}
        {item.estado === 'BORRADOR' && (
          <Menu>
            <MenuButton
              bg="transparent"
              color="teal"
              fontSize="22px"
              _hover={{ bg: 'rgba(243, 115, 32, 0.1)' }}
              _active={{ boxShadow: 'none', bg: 'rgba(243, 115, 32, 0.1)' }}
              _focus={{ boxShadow: 'none' }}
              as={IconButton}
              icon={<HiOutlineDotsVertical />}
            />

            <MenuList boxShadow="0px 4px 4px rgba(0, 0, 0, 0.1)">
              <MenuItem onClick={() => retomarSolicitud(item.id)}>Retomar solicitud</MenuItem>
              {
                userData.userRoles.includes('ROLE_SUPERVISOR') === true && null
                // <MenuItem>Devolver solicitud</MenuItem>
              }
              <MenuItem onClick={() => desestimarHandler(item.id)}>Desestimar</MenuItem>
            </MenuList>
          </Menu>
        )}
        {/* {(item.estado === 'ENVIADO' || item.estado === 'APROBADO') && (
          <IconButton
            color="teal"
            bg={'transparent'}
            _hover={{ bg: 'rgba(243, 115, 32, 0.05)' }}
            aria-label="Ver detalle"
            size="md"
            fontSize="22px"
            // onClick={() => navigate('/modificar-tasas')}
            // onClick={() => {}}
            icon={<IoIosArrowForward />}
          />
        )} */}
      </Td>
    </Tr>
  );
};

export default TrElement;
