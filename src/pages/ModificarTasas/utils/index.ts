import { SegmentoProps } from "../../../models";

export const getSegmentIdsToRemove = (_selectedOptions: any, tasasData: any[]) : any[] => {
  const _selectedOptionsValues = _selectedOptions.map((filter: any) => filter.value);

  return tasasData
    .map((tasa: SegmentoProps) => {
      if (_selectedOptionsValues.indexOf(tasa.segmentoId) === -1) {
        return tasa.segmentoId;
      }
    })
    .filter(Boolean);
};

export const getDraftSegment = (editingData: SegmentoProps[], segmento: SegmentoProps) => {
  let editableTasa = segmento;
  for (let iEditing = 0; iEditing < editingData.length; iEditing++) {
    if (editingData[iEditing].segmentoId === editableTasa.segmentoId) {
      // Buscar plazos
      for (let iPlazos = 0; iPlazos < editableTasa.plazos.length; iPlazos++) {
        for (let i = 0; i < editingData[iEditing].plazos.length; i++) {
          if (editableTasa.plazos[iPlazos].id === editingData[iEditing].plazos[i].id) {
            for (let a = 0; a < editableTasa.plazos[iPlazos].gruposRiesgo.length; a++) {
              let grupoRiesgoDepurado = editableTasa.plazos[
                iPlazos
              ].gruposRiesgo.filter((item) => {
                const find = editingData[iEditing].plazos[i].gruposRiesgo.find(
                  (itemEditing) => itemEditing.id !== item.id
                );
                if (find) {
                  return true;
                } else {
                  return false;
                }
              });

              const gruposRiesgoModified = editingData[iEditing].plazos[
                i
              ].gruposRiesgo.map((item: any) => {
                return {
                  ...item,
                  modified: true
                };
              });
              grupoRiesgoDepurado = [...grupoRiesgoDepurado, ...gruposRiesgoModified];

              grupoRiesgoDepurado = grupoRiesgoDepurado.sort((a, b) => a.id - b.id);
              editableTasa.plazos[iPlazos].gruposRiesgo = grupoRiesgoDepurado;
            }
          }
        }
      }
      console.log('terminado', editableTasa);
    }
  }
  console.log('zzzzzzzzzzzz', editableTasa);

  return editableTasa;
}


export const addModifiedKey = (segmentos: any[]) : any => {
  let segmentosModified = segmentos;
  // Segmentos
  for (let i_level_1 = 0; i_level_1 < segmentosModified.length; i_level_1++) {
    const segmento = segmentos[i_level_1];

    // Plazos
    for (let i_level_2 = 0; i_level_2 < segmento.plazos.length; i_level_2++) {
      const plazo = segmento.plazos[i_level_2];

      // Grupos de riesgo
      for (let i_level_3 = 0; i_level_3 < plazo.gruposRiesgo.length; i_level_3++) {
        plazo.gruposRiesgo[i_level_3]['modified'] = true;
      }
    }
  }
  return segmentosModified;
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
 export const isObject = (item: any) : any => {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export const mergeDeep = (target: any, ...sources: any) : any =>{
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}


