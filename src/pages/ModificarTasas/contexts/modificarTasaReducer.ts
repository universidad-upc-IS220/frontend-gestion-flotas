import { ModificarTasaState } from "../models";
type ModificarTasaAction =
  | { type: 'draftCreated', payload: { id: number} }
  | { type: 'UPDATE_DATA_TO_SAVE', payload: { estado: string; segmentos: any[] } }
  | { type: 'UPDATE_LIVE_DATA', payload: { segmentos: any[] } }
  | { type: 'SAVE_EDITABLE_DATA', payload: any[]  }
  | { type: 'UPDATE_DRAFT_INFO', payload: { isDraftDocument: boolean; draftDocumentId:number } }
  | { type: 'UPDATE_ARE_CHANGES', payload: { areChanges: boolean } }

export const modificarTasaReducer = (state: ModificarTasaState, action:ModificarTasaAction) : ModificarTasaState=> {
  switch(action.type){
    case 'draftCreated':
      return {
        ...state,
        isDraftDocument: true,
        draftDocumentId: action.payload.id
      }
    case 'UPDATE_DATA_TO_SAVE':
      return {
        ...state,
        tasasDataToSave: {
          ...state.tasasDataToSave,
          data: {
            estado: action.payload.estado,
            segmentos: action.payload.segmentos
          }
        }
      }
    case 'UPDATE_LIVE_DATA':

      return {
        ...state,
        liveData: {
          ...state.liveData,
          segmentos: action.payload.segmentos
        }
      }
    case 'SAVE_EDITABLE_DATA':
      return {
        ...state,
        editableData: {
          segmentos: action.payload
        }
      }
    case 'UPDATE_ARE_CHANGES':
      return {
        ...state,
        liveData: {
          ...state.liveData,
          areChanges: action.payload.areChanges,
        }
      }
    case 'UPDATE_DRAFT_INFO':
      return {
        ...state,
        isDraftDocument: action.payload.isDraftDocument,
        draftDocumentId: action.payload.draftDocumentId
      }
    default:
      return state;
  }
}
