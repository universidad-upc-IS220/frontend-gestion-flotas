import { SegmentoProps } from "../../../models";


export const createLiveObjectData = (itsChanged: Boolean, segmento: SegmentoProps) => {
  const previousLiveData = JSON.parse(sessionStorage.getItem('liveData') || '{"segmentos":[]}');

  const segmentoData = previousLiveData.segmentos.find(
    (segment:any) => segment.segmentoId === segmento.segmentoId
  ) || {
    segmentoId: segmento.segmentoId,
    segmentoNombre: segmento.segmentoNombre,
    solicitudDetalleId: segmento.solicitudDetalleId,
    plazos: []
  };
  // console.log('segmentoData ->', segmentoData);

  // Search by plazo
  const plazosData = segmentoData?.plazos.find(
    (plazoObject:any) => plazoObject.nombre === segmento.plazos[0].nombre
  ) || {
    id: segmento.plazos[0].id,
    nombre: segmento.plazos[0].nombre,
    gruposRiesgo: []
  };
  // console.log('plazosData', plazosData);

  // Remove coincidence in grupos de riesgos list
  const grupoRiesgoData = plazosData?.gruposRiesgo.filter(
    (_grupo:any) => _grupo.id !== segmento.plazos[0].gruposRiesgo[0].id
  );
  // console.log('grupoRiesgoData', grupoRiesgoData);

  if (itsChanged) grupoRiesgoData?.push(segmento.plazos[0].gruposRiesgo[0]);
  plazosData.gruposRiesgo = grupoRiesgoData;

  // Remove coincidence in plazos list
  const plazosFiltered = segmentoData.plazos.filter(
    (_plazo:any) => _plazo.id !== segmento.plazos[0].id
  );
  // Insert new plazos
  if (plazosData.gruposRiesgo.length) plazosFiltered.push(plazosData);

  segmentoData.plazos = plazosFiltered;

  // Remove coincidence in segmentos list
  const segmentosFiltered = previousLiveData.segmentos.filter(
    (_segmento:any) => _segmento.segmentoId !== segmento.segmentoId
  );
  if (segmentoData.plazos.length) segmentosFiltered.push(segmentoData);
  previousLiveData.segmentos = segmentosFiltered;

  return previousLiveData;
}
