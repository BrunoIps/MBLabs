import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import * as cartAction from '../../../store/actions/cart'
import * as ordersActions from '../../../store/actions/orders'

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount)
  const cartItem = useSelector(state => {
    const tranformedCartIems = []
    for (const key in state.cart.items) {
      tranformedCartIems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      })
    }
    return tranformedCartIems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  });
  const dispatch = useDispatch()

  return (
    <View style={styles.screen}>
      <View style={styles.sumary}>
        <Text style={styles.sumaryText}>
          Total: <Text style={styles.amount}>R$ {Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        <Button
          title="Order Now"
          onPress={() => dispatch(ordersActions.addOrder(cartItem, cartTotalAmount))}
          disabled={cartItem.length === 0} />
      </View>
      <View>
        <FlatList data={cartItem} keyExtractor={item => item.productId} renderItem={itemData => <CartItem quantity={itemData.item.quantity} title={itemData.item.productTitle} amount={itemData.item.sum} isDeletable={true} onRemove={() => { dispatch(cartAction.removeFromCart(itemData.item.productId)) }} />
        } />
      </View>
    </View>
  )
};

CartScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Cart'
  }
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,

  },
  sumary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 20,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 15,
    backgroundColor: '#c9ccd5',

  },
  sumaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: 'red',
  }
});

export default CartScreen;