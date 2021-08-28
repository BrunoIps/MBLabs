import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { View, Button, SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetail from '../screens/shop/ProductsDetails';
import OrdersScreen from '../screens/shop/Orders';
import CartScreen from '../screens/shop/Cart';
import UserProducts from '../screens/user/UserProducts';
import Colors from '../../constants/Colors'
import ProductEdit from '../screens/user/EditProducts'
import AuthScreen from '../screens/user/AuthScreen'
import StartScreen from '../screens/user/StartScreen'
import * as  authAction from '../../store/actions/auth'

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

let toy = true;

const ShopNavigator = createDrawerNavigator({
  Produtos: {
    screen: ProductsNavigator, navigationOptions: {
      headerTitle: "Produtos",
    }
  },
  Pedidos: OrdersNavigator,

}, {
  contentOptions: {
    activeTintColor: Colors.primary
  },
  contentComponent: props => {
    const dispatch = useDispatch()
    return <View style={{ flex: 1, paddingTop: 5 }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
        <View style={{ width: '100%', alignItems: "center", justifyContent: 'space-around', flexDirection: 'row' }}>
          {toy && <Button title="Organizador" onPress={() => {
            dispatch(authAction.logout())
            props.navigation.navigate('Organizador')
          }} />}
          <Button title="Sair" onPress={() => {
            dispatch(authAction.logout())
            props.navigation.navigate('Auth')
          }} />
        </View>




      </SafeAreaView>


    </View>
  }
})

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
  Start: StartScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
  Organizador: EventManagerNavigator

}, {
  defaultNavigationOptions: defaultOptions
})


export default createAppContainer(MainNavigator);