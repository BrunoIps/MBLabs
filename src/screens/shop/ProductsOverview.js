import React from 'react';
import { FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverview = props => {
  const products = useSelector(state => { return state.products.availableProducts })

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => <ProductItem image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={() => { console.log('click') }}
        onAddCart={() => { console.log('add') }}
      />
      } />
  )
}

ProductsOverview.navigationOptions = navData => {
  return {
    headerTitle: "Products",

  }
}

export default ProductsOverview;