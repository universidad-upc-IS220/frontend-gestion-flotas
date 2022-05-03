import { Decimal } from 'decimal.js';
import { Box, Table, Thead, Tr, Tbody, Td, VStack, Tag, Text } from '@chakra-ui/react';
import { ThElement } from './components/ThElement';
import { SegmentoProps } from '../../models';

type ComponentProps = {
  tasa: SegmentoProps;
};

export const BAUDisplayTable: React.FC<ComponentProps> = ({ tasa }) => {
  return (
    <Box borderRadius={'8px'} overflow="hidden">
      <Table size="lg" color="#333333" fontSize="12px" bg="white">
        <Thead>
          {tasa.plazos.length > 0 && (
            <Tr bg="#F2F1F1">
              <ThElement key="grupo.main" text={'Plazos'} />
              {tasa.plazos[0].gruposRiesgo.map((grupo: any, index: number) => (
                <ThElement
                  key={`${Math.floor(Math.random() * 100)}-${grupo.nombre}`}
                  text={grupo.nombre}
                />
              ))}
            </Tr>
          )}
        </Thead>
        <Tbody>
          {tasa.plazos.length > 0 &&
            tasa.plazos.map((item) => (
              <Tr key={`${Math.floor(Math.random() * 100)}-${item.nombre}`}>
                <Td width="93px" padding={'7px 20px 10px 20px'} key={item.nombre}>
                  {item.nombre}
                </Td>
                {item.gruposRiesgo.map((grupo: any, index: number) => {
                  const percentageValue = grupo.tasa
                    ? new Decimal(grupo.tasa * 100).toFixed(2) + '%'
                    : 'N/A';
                  return (
                    <Td
                      width="74px"
                      height="64px"
                      padding={'7px 4px 10px 4px'}
                      key={`${Math.floor(Math.random() * 100)}-${grupo.nombre}`}
                    >
                      <VStack spacing="0">
                        <span>{percentageValue}</span>
                        {grupo.target && (
                          <Tag
                            padding="3px 3.5px"
                            color="#3A77BF"
                            bg="rgba(58, 119, 191, 0.1);"
                            border="1px solid #3A77BF"
                            fontSize="12px"
                            size={'sm'}
                          >
                            <Text paddingRight="2px">T.</Text>
                            <Text>Objetivo</Text>
                          </Tag>
                        )}
                      </VStack>
                    </Td>
                  );
                })}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};
