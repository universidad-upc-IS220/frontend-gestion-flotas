import React from 'react';
import { Flex, Icon, Text, Th } from '@chakra-ui/react';
import { BsArrowUp } from 'react-icons/bs';

const ThElement = ({ text }: { text: string }) => {
  const customWidth = text.length > 0 ? 'auto' : '30px';
  return (
    <Th
      textTransform="capitalize"
      color="#606162"
      fontSize={'13px'}
      paddingX="20px"
      width={customWidth}
    >
      <Text display="inline" mr="10px">
        {text}
      </Text>
    </Th>
  );
};

export default ThElement;
