import React from 'react';
import { Box, Flex, Checkbox, CheckboxGroup, Text } from '@chakra-ui/react';
function StateFilter() {
  return (
    <Flex mb="28px">
      <Text fontWeight={500} color="#606162">
        Estados:
      </Text>
      <Flex color="#333333" fontSize={'16px'} ml="15px">
        <Checkbox size="lg" colorScheme="brand" defaultChecked mr="20px">
          <Text fontSize="16px">Pendientes de aprobación</Text>
        </Checkbox>
        <Checkbox size="lg" colorScheme="brand" defaultChecked mr="20px">
          <Text fontSize="16px">Aprobadas</Text>
        </Checkbox>
        <Checkbox size="lg" colorScheme="brand" defaultChecked mr="20px">
          <Text fontSize="16px">Rechazadas</Text>
        </Checkbox>
      </Flex>
    </Flex>
  );
}

export default StateFilter;
