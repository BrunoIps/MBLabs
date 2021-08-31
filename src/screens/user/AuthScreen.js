import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, KeyboardAvoidingView, Button, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CheckBox from 'react-native-check-box'
import Colors from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input';
import * as authAction from '../../../store/actions/auth'

const FORM_UPDATE = 'FORM_UPDATE'


//REDUCER que uso para validar os valores dos inputs 
const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValue = {
      ...state.inputValues,
      [action.inputId]: action.value
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputId]: action.isValid
    };
    let upFormIsValid = true;

    for (const key in updatedValidities) {
      upFormIsValid = upFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: upFormIsValid,
      inputValues: updatedValue,
      inputValidities: updatedValidities
    }
  }
  return state;
}

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [erro, setErro] = useState(false)
  const [isSignup, setIsSignUp] = useState(false)

  const dispatch = useDispatch()

  const [formState, formDispatch] = useReducer(formReducer,
    {
      inputValues: {
        email: '',
        password: '',
      },
      inputValidities: {
        email: false,
        password: false,
      },
      formIsValid: false
    })

  useEffect(() => {
    if (erro) {
      Alert.alert('Parou aqui', erro, [{ text: 'OK' }])
    }
  }, [erro])

  const authHandler = useCallback(async () => {
    let action;
    if (isSignup) {
      action = authAction.signup(formState.inputValues.email, formState.inputValues.password, isChecked)
    } else {
      action = authAction.login(formState.inputValues.email, formState.inputValues.password, isChecked, formState.inputValues.email)
    }
    setErro(null)
    setIsLoading(true)
    try {

      await dispatch(action)
      props.navigation.navigate('Shop')
    }
    catch (err) {
      setErro(err.message)
      setIsLoading(false)
    }
  })

  const inputChangeHandler = useCallback((inputId, valorInicial, inicialValido) => {
    formDispatch({
      type: FORM_UPDATE,
      value: valorInicial,
      isValid: inicialValido,
      inputId: inputId,
    })
  }, [formDispatch])


  const load = useCallback(async () => {


    await dispatch(authAction.fetchManagers())


  }, [dispatch])

  useEffect(() => {
    load()
  }, [dispatch])

  return (

    <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradient} >
      < View style={styles.container} >
        <View style={styles.card}>

          <ScrollView style={styles.scrol}>
            <Input
              id='email'
              label="E-mail" keyboardType='email-address' required email autoCapitalize='none'
              erro="Email invalido" onInputChange={inputChangeHandler}
              valorInicial=''
            />
            <Input
              id='password'
              label="Senha" keyboardType='default'
              secureTextEntry={true}
              required minLength={6} autoCapitalize='none'
              erro="Coloque uma senha válida" onInputChange={inputChangeHandler}
              valorInicial=''
            />
            {isSignup && <CheckBox
              style={{ flex: 1, padding: 10 }}
              onClick={() => { setIsChecked(!isChecked) }}
              isChecked={isChecked}
              leftText={"Organizador de Eventos"}
            />}

            <View style={styles.btn}>
              {isLoading ? <ActivityIndicator size="small" color="red" /> : (<Button title={isSignup ? 'Registrar' : 'Login'} onPress={() => {
                props.navigation.setParams({ 'email': formState.inputValues.email })
                authHandler()


              }} />)}
            </View>
            <View style={styles.btn}>
              <Button title={`Ir para ${isSignup ? 'Login' : 'Registrar'}`} onPress={() => {
                setIsSignUp(!isSignup)
              }} />
            </View>
          </ScrollView>

        </View>
      </View>
    </LinearGradient >

  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,

  },
  gradient: {
    flex: 1,
  },

  card: {
    padding: 20,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center'
  },
  scrol: {
    width: "80%"
  },
  container: {
    margin: 20,

  },
  btn: {

    alignItems: 'center',
    marginTop: 5,
  },

})

AuthScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Login'
  }
}

export default AuthScreen;