import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetail from '../screens/shop/ProductsDetails';
import OrdersScreen from '../screens/shop/Orders';
import CartScreen from '../screens/shop/Cart';
import UserProducts from '../screens/user/UserProducts';
import Colors from '../../constants/Colors'
import ProductEdit from '../screens/user/EditProducts'
import AuthScreen from '../screens/user/AuthScreen'

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

let conteudo;
let titulo = true;

titulo ? conteudo = (createDrawerNavigator({
  Produtos: {
    screen: ProductsNavigator, navigationOptions: {
      headerTitle: "Produtos",
    }
  },
  Pedidos: OrdersNavigator,
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  }
})) : conteudo = createDrawerNavigator({
  Produtos: {
    screen: ProductsNavigator, navigationOptions: {
      headerTitle: "Produtos",
    }
  },
  Pedidos: OrdersNavigator,
  Organizador: {
    screen: EventManagerNavigator
  }
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  }
})


const ShopNavigator = conteudo

const AuthNavigator = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    headerTitle: 'Login'
  }
},
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,

      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold'
      },
      headerBackTitleStyle: {
        fontFamily: 'open-sans'
      },
      headerTintColor: 'white'
    }
  })


const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator

}, {
  defaultNavigationOptions: defaultOptions
})


export default createAppContainer(MainNavigator);