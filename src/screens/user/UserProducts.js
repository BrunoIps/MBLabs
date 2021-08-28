import React from 'react';
import { FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton'

import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../../constants/Colors';
import * as productsAction from '../../../store/actions/products'

const UserProduct = props => {
  const userProducts = useSelector(state => state.products.userProducts)
  const editProduct = (id) => {
    props.navigation.navigate('ProductEdit', { productId: id, })
  }
  const dispatch = useDispatch()

  const btnDelete = (id) => {
    Alert.alert('Deletar', 'Você tem certeza que deseja deletar este item ?', [
      {
        text: 'Cancelar',
        onPress: () => console.log(),
        style: 'cancel'
      },
      {
        text: 'Deletar',
        onPress: () => { dispatch(productsAction.deleteProduct(id)) }

      },
    ])
  }

  return (
    <FlatList data={userProducts} keyExtractor={item => item.id} renderItem={itemData => <ProductItem onViewDetail={() => { editProduct(itemData.item.id) }} image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price}>
      <Button title="Editar" color={Colors.secondary} onPress={() => { editProduct(itemData.item.id) }} />
      <Button title="Deletar" color={Colors.secondary} onPress={() => { btnDelete(itemData.item.id) }}
      />
    </ProductItem>} />
  )
}

UserProduct.navigationOptions = navData => {
  return {
    headerTitle: "Organizador",
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu' iconName='md-backspace' onPress={() => {
        navData.navigation.navigate('Shop')
      }} />
    </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='ADD' iconName='ios-create' onPress={() => {
        navData.navigation.navigate('ProductEdit')
      }} />
    </HeaderButtons>,
  }
}

export default UserProduct;