import { LOGIN, SIGNUP, CRIA_MODERADOR } from '../actions/auth'

const initialState = {
  token: null,
  userId: null,
  isMod: []
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {

        token: action.token,
        userId: action.userId,

      }
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,

      }
    case CRIA_MODERADOR:
      return {
        token: null,
        userId: action.userId,
        isMod: action.isMod
      }

    default:
      return state;
  }
}


export default authReducer;