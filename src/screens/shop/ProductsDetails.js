import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../../constants/Colors';
import * as cartActions from '../../../store/actions/cart'

const ProductDetail = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state => {
    return state.products.availableProducts.find(prod => prod.id === productId)
  });
  const dispatch = useDispatch()

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
        </View>
        <View style={styles.btn}>
          <Button color={Colors.secondary} title="Add to Cart" onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct))
          }} />
        </View>
        <Text style={styles.price} >R${selectedProduct.price}</Text>
        <Text style={styles.description} >{selectedProduct.description}</Text>
      </View>
    </ScrollView>
  )
}

ProductDetail.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    width: "100%",
    height: 300,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',

  },
  btn: {
    marginVertical: 10,
    alignItems: 'center',

  },
  price: {
    fontSize: 22,
    color: '#888',
    margin: 10,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontSize: 16,
    color: '#888',
    marginHorizontal: 20,
    fontFamily: 'open-sans'
  },
});

export default ProductDetail;