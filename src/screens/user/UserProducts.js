import React from 'react';
import { FlatList, Button } from 'react-native';
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

  return (
    <FlatList data={userProducts} keyExtractor={item => item.id} renderItem={itemData => <ProductItem onViewDetail={() => { editProduct(itemData.item.id) }} image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price}>
      <Button title="Edit" color={Colors.secondary} onPress={() => { editProduct(itemData.item.id) }} />
      <Button title="Delete" color={Colors.secondary} onPress={() => {
        dispatch(productsAction.deleteProduct(itemData.item.id))
      }}
      />
    </ProductItem>} />
  )
}

UserProduct.navigationOptions = navData => {
  return {
    headerTitle: "Event Manager",
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu' iconName='md-menu' onPress={() => {
        navData.navigation.toggleDrawer()
      }} />
    </HeaderButtons>,
  }
}

export default UserProduct;