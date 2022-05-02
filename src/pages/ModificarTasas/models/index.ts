import { SegmentoProps } from "../../../models";

export interface ModificarTasaState {
  existsRequestInProgress: boolean;
  isDraftDocument: boolean;
  draftDocumentId: number;
  tasasDataToSave: {
    areChanges: boolean;
    data: {
      estado: string;
      segmentos: SegmentoProps[]
    };
  };
  segmentFilters: {},
  liveData: {
    areChanges: boolean;
    segmentos: SegmentoProps[];
  },
  editableData: {
    segmentos: SegmentoProps[];
  }
}
