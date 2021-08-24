import React from 'react';
import { FlatList, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton'

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../../store/actions/cart'

const ProductsOverview = props => {
  const products = useSelector(state => { return state.products.availableProducts })
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={() => props.navigation.navigate('ProductDetail', { productId: itemData.item.id, productTitle: itemData.item.title })}
        onAddCart={() => {
          dispatch(cartActions.addToCart(itemData.item))
        }}
      />
      } />
  )
}

ProductsOverview.navigationOptions = navData => {
  return {
    headerTitle: "Products",
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Cart' iconName='md-cart' onPress={() => { }} />
    </HeaderButtons>
  }
}

export default ProductsOverview;