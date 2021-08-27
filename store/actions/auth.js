export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const CRIA_MODERADOR = 'CRIA_MODERADOR'
export const SET_MANAGERS = 'SET_MANAGERS'
export const AUTHENTICATE = 'AUTHENTICATE'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Mod from '../../models/Mod'

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token }
}

export const signup = (email, password, isManager) => {

  return async (dispatch) => {

    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmAz_6rg3nUq5UmQxYFa1RkvWqwnFBeqY',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isManager, email,
          password,

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
    console.log(responseData.idToken)



    dispatch({ type: SIGNUP, token: responseData.idToken, userId: responseData.localId, isManager: isManager, managerData: { email: responseData.email, isManager: isManager } })
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
    saveDataToAsync(responseData.idToken, responseData.localId, expirationDate)
  }
}

export const isSalesMan = (email, isManager) => {

  return async dispatch => {

    const manager = await fetch(`https://mbeventos-4e794-default-rtdb.firebaseio.com/manager.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        isManager: isManager,
      })
    });


    const responseData = await manager.json();
    console.log('cheguei aqui')

    dispatch({ type: CRIA_MODERADOR, managerData: { email: responseData.email, isManager: isManager } })
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
    saveDataToAsync(responseData.idToken, responseData.localId, expirationDate)
  }
}

export const login = (email, password, isManager) => {
  return async (dispatch, getState) => {
    console.log(getState().auth.token)
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


    dispatch({ type: LOGIN, token: responseData.idToken, userId: responseData.localId, managerData: { email: responseData.email, isManager: responseData.isManager } })
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
    saveDataToAsync(responseData.idToken, responseData.localId, expirationDate)
  }
}

export const fetchManagers = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://mbeventos-4e794-default-rtdb.firebaseio.com/manager.json');

      if (!response.ok) {
        throw Error('Parou no Fetch Managers')
      }
      const responseData = await response.json();

      const loadManagers = [];

      for (const key in responseData) {
        loadManagers.push(new Mod(responseData[key].email, responseData[key].isManager))
      }
      console.log(loadManagers)
      dispatch({ type: 'SET_MANAGERS', allManagers: loadManagers })

    } catch (e) {
      throw e;
    }
  }
}

const saveDataToAsync = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expirationDate: expirationDate.toISOString()
  }))
}