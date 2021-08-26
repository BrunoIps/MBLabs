import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton'
import * as productAction from '../../../store/actions/products'

const EditProductScreen = props => {


  const prodId = props.navigation.getParam('productId')
  const editedProduct = useSelector(state => state.products.userProducts.find(item => item.id === prodId))

  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [image, setImage] = useState(editedProduct ? editedProduct.imageUrl : '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');



  const submitHandler = useCallback(() => {

    if (title.length <= 0 || image.length <= 0 || description.length <= 0 || price <= 0) {
      Alert.alert('Preencha todos os campos necessários', 'Verifique seus campos', [{ text: 'OK' }])
      return;
    }

    if (editedProduct) {
      dispatch(productAction.editProduct(prodId, title, description, image))
      props.navigation.goBack();
    } else {
      if (price.length !== 0) {

        dispatch(productAction.createProduct(title, description, image, +price))
      }
      props.navigation.goBack();
    }



  }, [dispatch, prodId, title, image, description, price])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])


  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={text => {
            setTitle(text)
          }} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image</Text>
          <TextInput style={styles.input} value={image} onChangeText={text => setImage(text)} />
        </View>
        {editedProduct ?
          null :
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} keyboardType='numeric' value={price} onChangeText={text => {
              console.log(text)
              setPrice(text.replace(/[^0-9]/g, ''))
            }} />
          </View>}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} />
        </View>
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
});

export default EditProductScreen;