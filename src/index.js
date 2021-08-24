import React from 'react';
import { Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import productsReducer from '../store/reducer/products'
import { create } from 'yallist';

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>

    </Provider>
  );
}


