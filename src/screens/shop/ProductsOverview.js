import React from 'react';
import { FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton'

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../../store/actions/cart'
import Colors from '../../../constants/Colors'

const ProductsOverview = props => {
  const products = useSelector(state => { return state.products.availableProducts })
  const dispatch = useDispatch();

  const onViewDetail = (id, title) => {
    props.navigation.navigate('ProductDetail', { productId: id, productTitle: title })
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData =>
        <ProductItem
          onViewDetail={() => { onViewDetail(itemData.item.id, itemData.item.title) }}
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price.toFixed(2)}
        >
          <Button title="Details" color={Colors.secondary} onPress={() => { onViewDetail(itemData.item.id, itemData.item.title) }} />
          <Button title="ADD Cart" color={Colors.secondary} onPress={() => {
            dispatch(cartActions.addToCart(itemData.item))
          }} />
        </ProductItem>
      } />
  )
}

ProductsOverview.navigationOptions = navData => {
  return {
    headerTitle: "Products",
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Cart' iconName='md-cart' onPress={() => {
        navData.navigation.navigate('CartScreen')
      }} />
    </HeaderButtons>,
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu' iconName='md-menu' onPress={() => {
        navData.navigation.toggleDrawer()
      }} />
    </HeaderButtons>,
  }
}

export default ProductsOverview;