import { types } from "../types";

type ActionType = {
  type: string,
  payload: any
}

export const authReducer = (state = {}, action: ActionType)=> {
  switch (action.type) {
    case types.login:
      return {
        ...action.payload,
        logged:true
      }

    case types.logout:
        return {
          logged: false
        }
    default:
      return state;
  }
}
