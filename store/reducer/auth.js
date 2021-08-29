import { LOGIN, SIGNUP, CRIA_MODERADOR, SET_MANAGERS, AUTHENTICATE, LOGOUT } from '../actions/auth'
import Mod from '../../models/Mod'

const initialState = {
  token: null,
  userId: null,
  isMod: [],
  atual: null,
}

const authReducer = (state = initialState, action) => {
  const isMod = state.isMod;

  switch (action.type) {
    case LOGIN:
      let newModerador = new Mod(action.managerData.email, action.managerData.isManager)
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        isMod: isMod.concat(newModerador),
        atual: action.managerData.email
      }
    case SIGNUP:
      newModerador = new Mod(action.managerData.email, action.managerData.isManager)
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        isMod: isMod.concat(newModerador),
        atual: action.managerData.email,

      }

    case AUTHENTICATE:

      return {
        ...state,
        token: action.token,
        userId: action.userId,

      }
    case CRIA_MODERADOR:
      newModerador = new Mod(action.managerData.email, action.managerData.isManager)

      return {
        token: action.token,
        userId: action.userId,
        isMod: isMod.concat(newModerador),
        atual: action.managerData.email
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