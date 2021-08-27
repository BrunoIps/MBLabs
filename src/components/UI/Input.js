import React, { useReducer, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE'
const FOCUS = 'FOCUS'

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      }
    // case FOCUS:
    //   return {
    //     ...state,
    //     touched: true
    //   }

    default:
      return state;
  }
}


const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.valorInicial ? props.valorInicial : '',
    isValido: props.inicialValido,
    // touched: false
  })

  const { onInputChange, id } = props;

  useEffect(() => {
    // if (inputState.touched) {
    onInputChange(id, inputState.value, inputState.isValid);
    // }
  }, [inputState, onInputChange, id])

  const textHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
  }

  // const focusHandler = () => {
  //   dispatch({ type: FOCUS })
  // }

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput {...props} style={styles.input}
        value={inputState.value}
        onChangeText={textHandler}

      />
      {!inputState.isValid && (<Text style={styles.error}>{props.erro}</Text>)}
    </View>
  )
}

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    marginVertical: 10,
  },
  input: {
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  error: {
    color: 'red'
  }
})

export default Input;
