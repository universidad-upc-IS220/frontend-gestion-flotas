import { Decimal } from 'decimal.js';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import React, { useState } from 'react';
import { SegmentoProps } from '../../../types';

interface ComponentProps {
  idSegmento: number;
  nombreSegmento: string;
  idPlazo: number;
  nombrePlazo: string;
  idGrupoRiesgo: number;
  nombreGrupoRiesgo: string;
  tasaGrupoRiesgo: number;
  handleChanges: Function;
}

export const InputElement: React.FC<ComponentProps> = ({
  idSegmento,
  nombreSegmento,
  idPlazo,
  nombrePlazo,
  idGrupoRiesgo,
  nombreGrupoRiesgo,
  tasaGrupoRiesgo,
  handleChanges
}) => {
  const [customValue, setCustomValue] = useState<any>(null);
  const [displayValue, setDisplayValue] = useState('');

  const percentageValue = tasaGrupoRiesgo
    ? new Decimal(tasaGrupoRiesgo * 100).toFixed(2) + '%'
    : 'N/A';

  const validateChanges = (newValue: string, placeholderValue: string) => {
    const newDisplayValue = new Decimal(newValue).toFixed(2) + '%';
    let itsChanged = false;
    console.log(newDisplayValue, ' - ', placeholderValue);
    const segmento: SegmentoProps = {
      segmentoId: idSegmento,
      segmentoNombre: nombreSegmento,
      plazos: [
        {
          id: idPlazo,
          nombre: nombrePlazo,
          gruposRiesgo: [
            {
              id: idGrupoRiesgo,
              nombre: nombreGrupoRiesgo,
              tasa: parseFloat(newValue),
              target: true
            }
          ]
        }
      ]
    };

    if (newDisplayValue !== placeholderValue) {
      itsChanged = true;
      setDisplayValue(newDisplayValue);
      setCustomValue(newValue);
    } else {
      setCustomValue(null);
    }

    handleChanges({ changedFlag: itsChanged, segmento });
  };

  return (
    <Editable
      placeholder={percentageValue}
      // value={customValue ? customValue : ''}
      width="52px"
      height="42px"
      textAlign="center"
      color="#333333"
      borderRadius={'4px'}
    >
      <EditablePreview
        display="inline-flex"
        alignItems="center"
        height="100%"
        padding="0"
        w="100%"
        fontSize={'12px'}
        borderRadius={'4px'}
        justifyContent="center"
        border={customValue ? '1px solid #28cc9e' : '1px solid #9B9B9B'}
        color={customValue ? '#333333' : '#9B9B9B'}
      />
      <EditableInput
        padding="0"
        height="100%"
        textAlign={'center'}
        onChange={(e: any) => {
          validateChanges(e.target.value, e.target.attributes['placeholder'].value);
        }}
      />
    </Editable>
  );
};
