export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const CRIA_MODERADOR = 'CRIA_MODERADOR'
// import AsyncStorage from '@react-native-async-storage/async-storage';

import Mod from '../../models/Mod'

export const signup = (email, password, isManager) => {
  return async (dispatch, getState) => {


    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmAz_6rg3nUq5UmQxYFa1RkvWqwnFBeqY',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          isManager,
          returnSecureToken: true
        })
      })




    if (!response.ok) {
      const errorResponse = await response.json();
      const errorId = errorResponse.error.message;

      let message = 'Algo deu errado'

      if (errorId === 'EMAIL_EXISTS') {
        message = 'E-mail já registrado.'
      }

      throw new Error(message)
    }
    const responseData = await response.json();
    // const managerData = await manager.json();
    // console.log(responseData);

    dispatch({ type: SIGNUP, token: responseData.idToken, userId: responseData.localId, isManager: isManager })
  }
}

export const isSalesMan = (email, isManager) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const manager = await fetch(`https://mbeventos-4e794-default-rtdb.firebaseio.com/manager.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        isManager: isManager,
      })
    });

    const response = await fetch('https://mbeventos-4e794-default-rtdb.firebaseio.com/manager.json')

    const responseData = await manager.json();
    const manD = await response.json()

    const moderador = [];


    for (const key in manD) {
      moderador.push(new Mod(manD[key].email, manD[key].isManager))
    }


    dispatch({ type: CRIA_MODERADOR, userId: responseData.email, isMod: moderador })
  }
}

export const login = (email, password, isManager) => {
  return async dispatch => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmAz_6rg3nUq5UmQxYFa1RkvWqwnFBeqY',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          isManager,
          returnSecureToken: true
        })
      })



    if (!response.ok) {
      const errorResponse = await response.json();
      const errorId = errorResponse.error.message;

      let message = 'Algo deu errado'

      if (errorId === 'EMAIL_NOT_FOUND' && errorId === 'INVALID_PASSWORD') {
        message = 'Verifique se está registrado, verifique e-mail e senha.'
      }

      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'E-mail não foi encontrado'
      }
      if (errorId === 'INVALID_PASSWORD') {
        message = 'Senha inválida'
      }
      throw new Error(message)
    }
    const responseData = await response.json();
    // const managerData = await manager.json();


    dispatch({ type: LOGIN, token: responseData.idToken, userId: responseData.localId })
  }
}