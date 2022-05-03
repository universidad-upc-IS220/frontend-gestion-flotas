import { Box, Table, Thead, Tr, Tbody, Td } from '@chakra-ui/react';
import ThElement from './components/ThElement';
import { InputElement } from './components/InputElement';
import { SegmentoProps } from '../../models';
import { ModificarTasaContext } from '../../pages/ModificarTasas/contexts/ModificarTasaContext';
import { useContext } from 'react';
import { createLiveObjectData } from './utils';

interface ComponentProps {
  tasa: SegmentoProps;
}

export const BAUEditingTable: React.FC<ComponentProps> = ({ tasa }) => {
  console.log('PERFORMANCE re-render BAUEditingTable >', tasa);

  const { updateAreChanges } = useContext(ModificarTasaContext);

  const validateInputChanges = (itsChanged: Boolean, segmento: SegmentoProps) => {
    console.log('call validateInputChanges', segmento);

    const liveObjectData = createLiveObjectData(itsChanged, segmento);
    console.log('Guardar en session Storage jeje', liveObjectData);

    // Llave para saber si existen nuevos valores en live data
    const existChanges = !!liveObjectData.segmentos.length;

    // Guarda los cambios realizados por el usuario en session storage
    sessionStorage.setItem('liveData', JSON.stringify(liveObjectData));
    updateAreChanges(existChanges);
  };

  return (
    <Box borderRadius={'8px'} overflow="hidden">
      <Table size="lg" color="#333333" fontSize="12px" bg="white">
        <Thead>
          {tasa.plazos.length > 0 && (
            <Tr bg="#F2F1F1">
              <ThElement key={`live-th-static`} text={'Plazos'} />
              {tasa.plazos[0].gruposRiesgo.map((grupo: any, index: number) => (
                <ThElement key={`live-th-${grupo.nombre}`} text={grupo.nombre} />
              ))}
            </Tr>
          )}
        </Thead>
        <Tbody>
          {tasa.plazos.length > 0 &&
            tasa.plazos.map((plazo) => (
              <Tr key={`live-tr-${plazo.nombre}`}>
                <Td width="93px" padding={'7px 20px 10px 20px'} key={`live-td-${plazo.nombre}`}>
                  {plazo.nombre}
                </Td>
                {plazo.gruposRiesgo.map((grupo: any, index: number) => {
                  const modified = grupo.modified || false;
                  return (
                    <Td
                      width="74px"
                      height="64px"
                      padding={'7px 4px 10px 4px'}
                      key={`live-td-${grupo.nombre}`}
                    >
                      <InputElement
                        idSegmento={tasa.segmentoId}
                        nombreSegmento={tasa.segmentoNombre}
                        solicitudDetalleId={tasa.solicitudDetalleId}
                        idPlazo={plazo.id}
                        nombrePlazo={plazo.nombre}
                        idGrupoRiesgo={grupo.id}
                        nombreGrupoRiesgo={grupo.nombre}
                        tasaGrupoRiesgo={grupo.tasa}
                        targetGrupoRiesgo={grupo.target}
                        tasaDetalleId={grupo.tasaDetalleId}
                        modified={modified}
                        handleChanges={validateInputChanges}
                      />
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
