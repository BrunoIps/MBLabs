export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const CRIA_MODERADOR = 'CRIA_MODERADOR'
export const SET_MANAGERS = 'SET_MANAGERS'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer;

import AsyncStorage from '@react-native-async-storage/async-storage';

import Mod from '../../models/Mod'
import { API_URL, API_TOKEN } from "../../constants/API_K"

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setTimeLogout(expiryTime))
    dispatch({ type: AUTHENTICATE, userId: userId, token: token })

  }
}

export const signup = (email, password, isManager) => {

  return async (dispatch) => {

    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_TOKEN}`,
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
    // console.log(responseData.idToken)



    dispatch({ type: SIGNUP, token: responseData.idToken, userId: responseData.localId, isManager: isManager, managerData: { email: responseData.email, isManager: isManager } })
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
    saveDataToAsync(responseData.idToken, responseData.localId, expirationDate, responseData.email)
  }
}

export const isSalesMan = (email, isManager) => {

  return async dispatch => {

    const manager = await fetch(`${API_URL}manager.json`, {
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
    saveDataToAsync(responseData.idToken, responseData.localId, expirationDate, responseData.email)
  }
}

export const login = (email, password, isManager) => {
  return async (dispatch, getState) => {
    // console.log(getState().auth.token)
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_TOKEN}`,
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
    saveDataToAsync(responseData.idToken, responseData.localId, expirationDate, responseData.email)
  }
}

export const fetchManagers = () => {
  return async dispatch => {
    try {
      const response = await fetch(`${API_URL}manager.json`);

      if (!response.ok) {
        throw Error('Parou no Fetch Managers')
      }
      const responseData = await response.json();

      const loadManagers = [];

      for (const key in responseData) {
        loadManagers.push(new Mod(responseData[key].email, responseData[key].isManager))
      }

      dispatch({ type: 'SET_MANAGERS', managers: loadManagers })

    } catch (e) {
      throw e;
    }
  }
}


export const logout = () => {
  return dipatch => {
    clearTimer()
    AsyncStorage.removeItem('userData')
  }

  return { type: LOGOUT }
}

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

const setTimeLogout = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime);
  }
}

const saveDataToAsync = (token, userId, expirationDate, email) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expirationDate: expirationDate.toISOString(),
    email: email
  }))
}