import { createContext } from 'react';
import { ModificarTasaState } from '../models';
import { SegmentoProps } from '../../../models';

// Los types no se pueden extender
export type ModificarTasaContextProps = {
  modificarTasaState: ModificarTasaState;
  updateDataToSave: (data: any) => void;
  updateLiveData: (segmentos: { segmentos: SegmentoProps[] }) => void;
  updateDraftInfo: (isDraftDocument: boolean, draftDocumentId: number) => void;
  updateAreChanges: (updateAreChanges: boolean) => void;
  saveEditableData: (data: any) => void;
};

export const ModificarTasaContext = createContext<ModificarTasaContextProps>(
  {} as ModificarTasaContextProps
);
