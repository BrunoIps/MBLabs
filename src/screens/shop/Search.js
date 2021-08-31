import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Button, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton'

import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../../constants/Colors';

const Search = props => {
  const products = useSelector(state => { return state.products.availableProducts })
  const [inputText, setInputText] = useState('');
  const [filtro, setFiltro] = useState('')
  const produtosFiltrados = products.filter(prod => {
    return prod.title.includes(filtro)
  })

  const onViewDetail = (id, title) => {
    props.navigation.navigate('ProductDetail', { productId: id, productTitle: title })
  }


  return (

    <View >
      <View style={styles.form}>
        <TextInput style={styles.input} value={inputText} onChangeText={text => {
          setInputText(text)
        }} />
        <Button title='Filtrar' onPress={() => setFiltro(inputText)} />
      </View>
      {produtosFiltrados.length > 0 ? <FlatList

        data={produtosFiltrados}
        keyExtractor={item => item.id}
        renderItem={itemData =>
          <ProductItem
            onViewDetail={() => { onViewDetail(itemData.item.id, itemData.item.title) }}
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
          >
            <Button title="Detalhes" color={Colors.secondary} onPress={() => { onViewDetail(itemData.item.id, itemData.item.title) }} />
            <Button title="Adicionar no Carrinho" color={Colors.secondary} onPress={() => {
              dispatch(cartActions.addToCart(itemData.item))
            }} />
          </ProductItem>
        } /> : <View style={styles.Nada}><Text>Nenhum item encontrado</Text></View>
      }
    </View>
  )
}

Search.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu' iconName='md-menu' onPress={() => {
        navData.navigation.toggleDrawer()
      }} />
    </HeaderButtons>,
  }
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  input: {
    width: '50%',
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  Nada: {
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})




export default Search;