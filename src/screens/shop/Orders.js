import React, { useState, useEffect, useCallback } from 'react';
import { Text, FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersAction from '../../../store/actions/orders'

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState()


  const load = useCallback(async () => {

    setIsLoading(true)

    await dispatch(ordersAction.fetchOrders())

    setIsLoading(false);
  }, [dispatch])

  useEffect(() => {
    load()
  }, [dispatch])

  if (isLoading) {
    return (

      <View style={styles.loader}>
        <ActivityIndicator size='large' color='blue' />

      </View>
    )
  }

  return <FlatList data={orders} keyExtractor={item => item.id} renderItem={itemData => <OrderItem items={itemData.item.items} amount={itemData.item.totalAmount} date={itemData.item.dateString} />} />
}

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Pedidos',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu' iconName='md-menu' onPress={() => {
        navData.navigation.toggleDrawer()
      }} />
    </HeaderButtons>,
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default OrdersScreen;