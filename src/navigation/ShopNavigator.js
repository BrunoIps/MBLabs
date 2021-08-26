import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetail from '../screens/shop/ProductsDetails';
import OrdersScreen from '../screens/shop/Orders';
import CartScreen from '../screens/shop/Cart';
import UserProducts from '../screens/user/UserProducts';
import Colors from '../../constants/Colors'
import ProductEdit from '../screens/user/EditProducts'

const defaultOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: 'white'
}

const ProductsNavigator = createStackNavigator({
  ProductsOverview: {
    screen: ProductsOverview
  },
  ProductDetail: {
    screen: ProductDetail
  },
  CartScreen: {
    screen: CartScreen
  },

}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name='ios-cart' size={25} color={drawerConfig.tintColor} />
  },
  defaultNavigationOptions: defaultOptions
});

const EventManagerNavigator = createStackNavigator({
  UserProducts: { screen: UserProducts },
  ProductEdit: { screen: ProductEdit }
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name='ios-create' size={25} color={drawerConfig.tintColor} />
  },
  defaultNavigationOptions: defaultOptions
})

const OrdersNavigator = createStackNavigator({
  Orders: { screen: OrdersScreen }
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name='ios-list' size={25} color={drawerConfig.tintColor} />
  },
  defaultNavigationOptions: defaultOptions
})

const ShopNavigator = createDrawerNavigator({
  Produtos: {
    screen: ProductsNavigator, navigationOptions: {
      headerTitle: "Produtos",
    }
  },
  Pedidos: OrdersNavigator,
  Organizador: EventManagerNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  }
})


export default createAppContainer(ShopNavigator);