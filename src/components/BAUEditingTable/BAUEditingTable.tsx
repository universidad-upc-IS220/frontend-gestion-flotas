import { Box, Table, Thead, Tr, Tbody, Td } from '@chakra-ui/react';
import ThElement from './components/ThElement';
import { InputElement } from './components/InputElement';
import { SegmentoProps } from '../../types';

interface ComponentProps {
  tasa: SegmentoProps;
  handleChanges: Function;
}

const dataToSave: { estado: string; segmentos: SegmentoProps[] } = {
  estado: 'BORRADOR',
  segmentos: []
};

export const BAUEditingTable: React.FC<ComponentProps> = ({ tasa, handleChanges }) => {
  const validateInputChanges = ({
    changedFlag,
    segmento
  }: {
    changedFlag: boolean;
    segmento: SegmentoProps;
  }) => {
    // Search by segment
    const segmentoData = dataToSave.segmentos.find(
      (segmentoObject) => segmentoObject.segmentoId === segmento.segmentoId
    ) || {
      segmentoId: segmento.segmentoId,
      segmentoNombre: segmento.segmentoNombre,
      plazos: []
    };
    console.log('segmentoData ->', segmentoData);

    // Search by plazo
    const plazosData = segmentoData?.plazos.find(
      (plazoObject) => plazoObject.nombre === segmento.plazos[0].nombre
    ) || {
      id: segmento.plazos[0].id,
      nombre: segmento.plazos[0].nombre,
      gruposRiesgo: []
    };
    console.log('plazosData', plazosData);

    // Remove coincidence in grupos de riesgos list
    const grupoRiesgoData = plazosData?.gruposRiesgo.filter(
      (_grupo) => _grupo.id !== segmento.plazos[0].gruposRiesgo[0].id
    );
    if (changedFlag) grupoRiesgoData?.push(segmento.plazos[0].gruposRiesgo[0]);
    plazosData.gruposRiesgo = grupoRiesgoData;

    // Remove coincidence in plazos list
    const plazosFiltered = segmentoData.plazos.filter(
      (_plazo) => _plazo.id !== segmento.plazos[0].id
    );
    // Insert new plazos
    if (plazosData.gruposRiesgo.length) plazosFiltered.push(plazosData);

    segmentoData.plazos = plazosFiltered;

    // Remove coincidence in segmentos list
    const segmentosFiltered = dataToSave.segmentos.filter(
      (_segmento) => _segmento.segmentoId !== segmento.segmentoId
    );
    if (segmentoData.plazos.length) segmentosFiltered.push(segmentoData);
    dataToSave.segmentos = segmentosFiltered;
    console.log('dataToSave', dataToSave);

    // Enable the change button
    const existChanges = !!dataToSave.segmentos.length;
    handleChanges(existChanges);
  };

  return (
    <Box borderRadius={'8px'} overflow="hidden">
      <Table size="lg" color="#333333" fontSize="12px" bg="white">
        <Thead>
          {tasa.plazos.length > 0 && (
            <Tr bg="#F2F1F1">
              <ThElement key="grupo.main" text={'Plazos'} />
              {tasa.plazos[0].gruposRiesgo.map((grupo: any, index: number) => (
                <ThElement key={grupo.nombre} text={grupo.nombre} />
              ))}
            </Tr>
          )}
        </Thead>
        <Tbody>
          {tasa.plazos.length > 0 &&
            tasa.plazos.map((plazo) => (
              <Tr key={plazo.nombre}>
                <Td width="93px" padding={'7px 20px 10px 20px'} key={plazo.nombre}>
                  {plazo.nombre}
                </Td>
                {plazo.gruposRiesgo.map((grupo: any, index: number) => {
                  return (
                    <Td width="74px" height="64px" padding={'7px 4px 10px 4px'} key={grupo.nombre}>
                      <InputElement
                        idSegmento={tasa.segmentoId}
                        nombreSegmento={tasa.segmentoNombre}
                        idPlazo={plazo.id}
                        nombrePlazo={plazo.nombre}
                        idGrupoRiesgo={grupo.id}
                        nombreGrupoRiesgo={grupo.nombre}
                        tasaGrupoRiesgo={grupo.tasa}
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
