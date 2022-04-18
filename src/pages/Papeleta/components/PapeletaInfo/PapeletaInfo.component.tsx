import { Table, Tbody, Th, Thead, Tr, Td, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { ThElement } from './components/ThElement';

type Props = {
  data: any[];
};

export const PapeletaInfoComponent: React.FC<Props> = ({ data }) => {
  return (
    <Table size="lg" color="#333333" fontSize="12px" bg="white">
      <Thead>
        {data.length > 0 && (
          <Tr bg="#F2F1F1">
            {Object.keys(data[0]).map((columnName: any, index: number) => (
              <ThElement key={index} text={columnName} />
            ))}
          </Tr>
        )}
      </Thead>
      <Tbody>
        {data.length > 0 &&
          data.map((item, index) => (
            <Tr key={index}>
              <Td width="180px" height="64px" padding={'10px 10px 10px 10px'}>
                {item.entidad}
              </Td>
              <Td width="180px" height="64px" padding={'10px 10px 10px 10px'}>
                {item.estadoDeuda}
              </Td>
              <Td width="70px" height="64px" padding={'10px 10px 10px 10px'}>
                {item.falta}
              </Td>
              <Td width="80px" height="64px" padding={'10px 10px 10px 10px'}>
                {item.fecha}
              </Td>
              <Td width="80px" height="64px" padding={'10px 10px 10px 10px'}>
                {item.fechaFirme}
              </Td>
              <Td width="70px" height="64px" padding={'10px 10px 10px 10px'}>
                {item.papeleta}
              </Td>
              <Td width="100px" height="64px" padding={'10px 10px 10px 10px'}>
                {item.resolucion}
              </Td>
              <Td width="70px" height="64px" padding={'10px 10px 10px 10px'}>
                {item.retencionLicencia}
              </Td>
              <Td width="auto" height="64px" padding={'10px 10px 10px 10px'}>
                {item.telefonoEntidad}
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
