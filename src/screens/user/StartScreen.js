import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from 'react-redux';

import * as authActions from '../../../store/actions/auth'

const StartScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {



    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth')
        return;
      }

      const tranformedData = JSON.parse(userData)
      const { token, userId, expirationDate } = tranformedData;

      const expireDate = new Date(expirationDate)
      const expiring = expireDate.getTime() - new Date().getTime()
      console.log(expiring)
      if (expireDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth', { email: 'batata' })
        return;
      }


      props.navigation.navigate('Shop', { email: 'batata' })
      dispatch(authActions.authenticate(userId, token, expiring))

    }

    tryLogin()
  }, [dispatch])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' colors='red' />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default StartScreen;