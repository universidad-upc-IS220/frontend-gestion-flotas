import { ModificarTasaState } from '../models';
import { ModificarTasaContext } from './ModificarTasaContext';
import { modificarTasaReducer } from './modificarTasaReducer';
import { useReducer } from 'react';
import { SegmentoProps } from '../../../models';

interface Props {
  children: React.ReactNode;
}

type dataToSaveProps = {
  estado: string;
  segmentos: SegmentoProps[];
};

const INITIAL_STATE: ModificarTasaState = {
  existsRequestInProgress: false,
  isDraftDocument: false,
  draftDocumentId: 1234,
  tasasDataToSave: {
    areChanges: false,
    data: {
      estado: '',
      segmentos: []
    }
  },
  segmentFilters: {},
  liveData: { areChanges: false, segmentos: [] },
  editableData: { segmentos: [] }
};

export const ModificarTasaProvider: React.FC<Props> = ({ children }) => {
  /**
   * ModificarTasaContext.Provider: provee el estado y la acción para el componente hijo
   * modificarTasaState: estado de la aplicación
   * modificarTasaDispatch: método para ejecutar acciones
   * INITIAL_STATE: estado inicial de la aplicación
   */
  const [modificarTasaState, modificarTasaDispatch] = useReducer(
    modificarTasaReducer,
    INITIAL_STATE
  );

  const updateDataToSave = (data: dataToSaveProps): void => {
    modificarTasaDispatch({
      type: 'UPDATE_DATA_TO_SAVE',
      payload: data
    });
  };

  const updateLiveData = (segmentos: { segmentos: SegmentoProps[] }): void => {
    modificarTasaDispatch({
      type: 'UPDATE_LIVE_DATA',
      payload: segmentos
    });
  };

  const updateDraftInfo = (isDraftDocument: boolean, draftDocumentId: number): void => {
    modificarTasaDispatch({
      type: 'UPDATE_DRAFT_INFO',
      payload: { isDraftDocument, draftDocumentId }
    });
  };

  const updateAreChanges = (areChanges: boolean): void => {
    modificarTasaDispatch({
      type: 'UPDATE_ARE_CHANGES',
      payload: { areChanges }
    });
  };

  const saveEditableData = (segmentos: SegmentoProps[]): void => {
    console.log('previous', segmentos);

    modificarTasaDispatch({
      type: 'SAVE_EDITABLE_DATA',
      payload: segmentos
    });
  };

  return (
    <ModificarTasaContext.Provider
      value={{
        modificarTasaState,
        updateDataToSave,
        updateLiveData,
        updateDraftInfo,
        updateAreChanges,
        saveEditableData
      }}
    >
      {children}
    </ModificarTasaContext.Provider>
  );
};
