import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import ProductsOverview from "../screens/shop/ProductsOverview";
import Colors from '../../constants/Colors'

const ProductsNavigator = createStackNavigator({
  ProductsOverview: {
    screen: ProductsOverview
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: 'white'
  }
});


export default createAppContainer(ProductsNavigator);