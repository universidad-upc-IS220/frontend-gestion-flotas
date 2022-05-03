import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { PapeletaProps } from '../../../../models';

type Props = {
  data: PapeletaProps[];
};
export const PapeletasTableComponent: React.FC<Props> = ({ data }) => {
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th fontSize="11px" py="10px" px="7px">
              Entidad
            </Th>
            <Th fontSize="11px" py="10px" px="7px">
              Estado
            </Th>
            <Th fontSize="11px" py="10px" px="7px">
              Falta
            </Th>
            <Th fontSize="11px" py="10px" px="7px">
              Fecha
            </Th>
            <Th fontSize="11px" py="10px" px="7px">
              Papeleta
            </Th>
            <Th fontSize="11px" py="10px" px="7px">
              Retención
            </Th>
            <Th fontSize="11px" py="10px" px="7px">
              T. Entidad
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((papeleta: PapeletaProps) => (
            <Tr key={papeleta.papeleta}>
              <Td fontSize="11px" py="10px" px="7px">
                {papeleta.entidad}
              </Td>
              <Td fontSize="11px" py="10px" px="7px">
                {papeleta.estadoDeuda}
              </Td>
              <Td fontSize="11px" py="10px" px="7px">
                {papeleta.falta}
              </Td>
              <Td fontSize="11px" py="10px" px="7px">
                {papeleta.fecha}
              </Td>
              <Td fontSize="11px" py="10px" px="7px">
                {papeleta.papeleta}
              </Td>
              <Td fontSize="11px" py="10px" px="7px">
                {papeleta.retencionLicencia}
              </Td>
              <Td fontSize="11px" py="10px" px="7px">
                {papeleta.telefonoEntidad}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
