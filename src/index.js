import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import ReduxThunk from 'redux-thunk'

import productsReducer from '../store/reducer/products'
import cartReducer from '../store/reducer/cart';
import ordersReducer from '../store/reducer/orders';
import authReducer from '../store/reducer/auth'
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)} />
    )
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}


