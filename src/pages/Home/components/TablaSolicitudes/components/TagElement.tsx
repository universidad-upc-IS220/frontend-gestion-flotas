import React from 'react';
import { Tag } from '@chakra-ui/react';
import { capitalize } from '../../../../../utils/textTransform';

const TagElement = ({ estado }: { estado: string }) => {
  // default colors
  let background = '#F2F1F1';
  let color = '#606162';
  let outlineColor = '#F2F1F1';
  let text = estado;

  switch (estado) {
    case 'ENVIADO':
      background = 'rgba(128, 90, 220, 0.05)';
      color = '#805ADC';
      outlineColor = '#805ADC';
      text = 'Pendiente de aprobación';
      break;
    case 'APROBADO':
      background = 'rgba(6, 202, 117, 0.05)';
      color = '#06CA75';
      outlineColor = '#06CA75';
      break;
    case 'RECHAZADO':
      background = 'rgba(255, 2, 2, 0.05)';
      color = '#FF0202';
      outlineColor = '#FF0202';
      text = 'rechazada';
      break;
  }

  return (
    <Tag
      minHeight="22px"
      display={'inline-flex'}
      alignItems="center"
      color={color}
      fontSize="14px"
      lineHeight={1.1}
      paddingY={'4px'}
      fontWeight={400}
      borderRadius="4px"
      border={`1px solid ${outlineColor}`}
      background={background}
    >
      {capitalize(text)}
    </Tag>
  );
};

export default TagElement;
