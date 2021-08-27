import React, { useEffect, useCallback, useReducer } from 'react';
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productAction from '../../../store/actions/products';
import Input from '../../components/UI/Input'

const FORM_UPDATE = 'FORM_UPDATE'

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

const EditProductScreen = props => {


  const prodId = props.navigation.getParam('productId')
  const editedProduct = useSelector(state => state.products.userProducts.find(item => item.id === prodId))

  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer,
    {
      inputValues: {
        title: editedProduct ? editedProduct.title : '',
        image: editedProduct ? editedProduct.imageUrl : '',
        price: editedProduct ? editedProduct.price : '',
        description: editedProduct ? editedProduct.description : '',
      },
      inputValidities: {
        title: editedProduct ? true : false,
        image: editedProduct ? true : false,
        price: editedProduct ? true : false,
        description: editedProduct ? true : false,
      },
      formIsValid: editedProduct ? true : false
    })




  const submitHandler = useCallback(() => {
    console.log(prodId)
    if (!formState.formIsValid) {
      Alert.alert('Preencha todos os campos necessários', 'Verifique seus campos', [{ text: 'OK' }])
      return;
    }

    if (editedProduct) {
      dispatch(productAction.editProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.image))
      props.navigation.goBack();
    } else {

      dispatch(productAction.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.image, +formState.inputValues.price))

      props.navigation.goBack();
    }



  }, [dispatch, prodId, formState])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  const inputsChange = useCallback((inputId, valorInicial, inicialValido) => {
    formDispatch({
      type: FORM_UPDATE,
      value: valorInicial,
      isValid: inicialValido,
      inputId: inputId
    })
  }, [formDispatch])
  return (



    <ScrollView>

      <View style={styles.form}>
        <Input autoCapitalize='sentences'
          id='title'
          label='Titulo'
          erro='Título não pode estar vazio'
          onInputChange={inputsChange}
          valorInicial={editedProduct ? (editedProduct.title) : ''}
          inicialValido={!editedProduct}
          required
        />

        <Input
          id='image'
          label='Imagem'
          erro='Imagem não pode estar vazio'
          onInputChange={inputsChange}
          valorInicial={editedProduct ? (editedProduct.imageUrl) : ''}
          inicialValido={!editedProduct}

          required
        />


        {editedProduct ?
          null :
          (<Input keyboardType='decimal-pad'
            id='price'
            onInputChange={inputsChange}
            isValid='formState.inputValidities.price' label='Preço'
            erro='Precisa ser um preço acima de 0'
            required
            min={0.1}
          />
          )
        }

        <Input
          id='description'
          autoCapitalize='sentences'
          label='Descrição'
          erro='Descrição não pode estar vazio'
          onInputChange={inputsChange}
          numberOfLines={3}
          valorInicial={editedProduct ? (editedProduct.description) : ''}
          inicialValido={!editedProduct}
          required
          minLength={5}
        />

      </View>

    </ScrollView>


  )
}

EditProductScreen.navigationOptions = navData => {
  const submit = navData.navigation.getParam('submit')
  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Editar' : 'Novo Produto',
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='SAVE' iconName='ios-checkmark' onPress={submit} />
    </HeaderButtons>,
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },

  keyboad: {
    flex: 1
  }
});

export default EditProductScreen;