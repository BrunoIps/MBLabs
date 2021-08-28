import { LOGIN, SIGNUP, CRIA_MODERADOR, SET_MANAGERS, AUTHENTICATE, LOGOUT } from '../actions/auth'
import Mod from '../../models/Mod'

const initialState = {
  token: null,
  userId: null,
  isMod: []
}

const authReducer = (state = initialState, action) => {
  const isMod = state.isMod;

  switch (action.type) {
    case LOGIN:
      let newModerador = new Mod(action.managerData.email, action.managerData.isManager)
      return {
        token: action.token,
        userId: action.userId,
        isMod: isMod.concat(newModerador)
      }
    case SIGNUP:
      newModerador = new Mod(action.managerData.email, action.managerData.isManager)
      return {
        token: action.token,
        userId: action.userId,
        isMod: isMod.concat(newModerador)
      }

    case AUTHENTICATE:

      return {
        token: action.token,
        userId: action.userId,
        ...state,
      }
    case CRIA_MODERADOR:
      newModerador = new Mod(action.managerData.email, action.managerData.isManager)

      return {
        token: action.token,
        userId: action.userId,
        isMod: isMod.concat(newModerador)
      }
    case SET_MANAGERS:
      return {
        ...state,
        isMod: action.managers,

      }
    case LOGOUT:
      return initialState;


    default:
      return state;
  }
}


export default authReducer;