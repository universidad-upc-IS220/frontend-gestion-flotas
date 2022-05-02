import { Decimal } from 'decimal.js';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { SegmentoProps } from '../../../models';
import { ModificarTasaContext } from '../../../pages/ModificarTasas/contexts/ModificarTasaContext';

interface ComponentProps {
  idSegmento: number;
  nombreSegmento: string;
  solicitudDetalleId: number | null;
  idPlazo: number;
  nombrePlazo: string;
  idGrupoRiesgo: number;
  nombreGrupoRiesgo: string;
  tasaGrupoRiesgo: number;
  targetGrupoRiesgo: boolean;
  tasaDetalleId: number;
  modified: boolean;
  handleChanges: Function;
}

let keyboardTimer: ReturnType<typeof setTimeout>;
export const InputElement: React.FC<ComponentProps> = ({
  idSegmento,
  nombreSegmento,
  solicitudDetalleId,
  idPlazo,
  nombrePlazo,
  idGrupoRiesgo,
  nombreGrupoRiesgo,
  tasaGrupoRiesgo,
  targetGrupoRiesgo,
  tasaDetalleId,
  modified,
  handleChanges
}) => {
  const { modificarTasaState } = useContext(ModificarTasaContext);
  const [displayValue, setDisplayValue] = useState('');
  const [itsChanged, setItsChanged] = useState(false);

  const [lastValueAccepted, setLastValueAccepted] = useState(tasaGrupoRiesgo);

  const percentageValue = tasaGrupoRiesgo
    ? new Decimal(tasaGrupoRiesgo * 100).toFixed(2) + '%'
    : 'N/A';

  const onBlurHandler = (value: string | number) => {
    const decimalFormat = value ? new Decimal(value).toFixed(2) : '';
    console.log('itsChanged', itsChanged, 'decimalFormat', decimalFormat);

    let finalValue = itsChanged ? decimalFormat : '';

    /* if (finalValue === '' && modificarTasaState.isDraftDocument) {
      finalValue = new Decimal(0).toFixed(2);
    } */

    setDisplayValue(finalValue);
  };

  const validateChanges = (newValue: string, placeholderValue: string) => {
    // Mostramos en la caja lo que el usuario escribe, aunque sea vacío
    // setDisplayValue(newValue);

    console.log('displayValue ->', newValue);

    setDisplayValue(newValue);

    // Eliminamos el proceso de validación si es un campo vacío
    // if (newValue === '') return;

    // const valueToCompare = newValue ? `${new Decimal(newValue).toFixed(2)}%` : '';
    // console.log(valueToCompare, ' vs ', placeholderValue);

    // Compara el nuevo valor con el valor actual del grupo de riesgo

    // const beforeValueToCompare = modificarTasaState.isDraftDocument ?  : tasaGrupoRiesgo;

    console.log('Nuevo: ', parseFloat(newValue) / 100, ' -  Antes:', tasaGrupoRiesgo);
    let isDifferent = newValue !== '' && parseFloat(newValue) / 100 !== tasaGrupoRiesgo;
    console.log('es diferente ?', isDifferent);
    /* if (isDifferent) {
      const newValueToCompare = parseFloat(newValue) / 100;
      console.log('nuevo valor a comparar', newValueToCompare);

      setLastValueAccepted(newValueToCompare);
    } */
    console.log('oooooooooooooooo', solicitudDetalleId);

    // const parsedValue;
    const segmento: SegmentoProps = {
      segmentoId: idSegmento,
      segmentoNombre: nombreSegmento,
      solicitudDetalleId: solicitudDetalleId,
      plazos: [
        {
          id: idPlazo,
          nombre: nombrePlazo,
          gruposRiesgo: [
            {
              id: idGrupoRiesgo,
              nombre: nombreGrupoRiesgo,
              tasa: isDifferent ? parseFloat(newValue) / 100 : tasaGrupoRiesgo,
              target: targetGrupoRiesgo,
              tasaDetalleId: tasaDetalleId
            }
          ]
        }
      ]
    };
    console.log('a guardar en el estado', segmento);

    setItsChanged(isDifferent);
    clearTimeout(keyboardTimer);
    keyboardTimer = setTimeout(() => {
      handleChanges(isDifferent, segmento);
    }, 250);
  };

  return (
    <Editable
      placeholder={percentageValue}
      defaultValue={'1'}
      value={displayValue}
      onBlur={(e: any) => onBlurHandler(e.target.value)}
      width="52px"
      height="42px"
      textAlign="center"
      color="#333333"
      borderRadius={'4px'}
      // onChange={(e: any) => console.log(e)}
    >
      <EditablePreview
        display="inline-flex"
        alignItems="center"
        height="100%"
        padding="0"
        w="full"
        fontSize={'12px'}
        borderRadius={'4px'}
        justifyContent="center"
        border={itsChanged || modified ? '1px solid teal' : '1px solid #9B9B9B'}
        color={itsChanged || modified ? '#333333' : '#9B9B9B'}
        fontStyle={itsChanged || modified ? 'normal' : 'italic'}
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
