import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetail from '../screens/shop/ProductsDetails';
import CartScreen from '../screens/shop/Cart';
import Colors from '../../constants/Colors'

const ProductsNavigator = createStackNavigator({
  ProductsOverview: {
    screen: ProductsOverview
  },
  ProductDetail: {
    screen: ProductDetail
  },
  CartScreen: {
    screen: CartScreen
  }
}, {
  defaultNavigationOptions: {
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
});


export default createAppContainer(ProductsNavigator);