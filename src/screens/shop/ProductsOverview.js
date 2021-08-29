import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Button, ActivityIndicator, View, StyleSheet, Text, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../../store/actions/cart'
import * as productActions from '../../../store/actions/products';
import * as authAction from '../../../store/actions/auth'
import Colors from '../../../constants/Colors'



const ProductsOverview = props => {


  const [isLoading, setIsLoading] = useState(false)
  const [deuErro, setDeuErro] = useState();
  const [isRefreshing, setRefreshing] = useState(false)
  const [isloaded, setIsLoaded] = useState(false)


  const products = useSelector(state => { return state.products.availableProducts })
  const email = useSelector(state => { return state.auth.atual })


  const manag = useSelector(state => {
    return state.auth.isMod
  })



  const isAdm = () => {
    const achei = manag.filter(item => {
      return item.email === email
    })

    if (achei.length !== 0) {
      if (achei[0].isManager === false) {
        Alert.alert('Você não é ADM"', "Caso vocẽ seja, favor relogar", [{ text: 'OK' }])
      }
      if (achei[0].isManager === true) {
        props.navigation.navigate('Organizador')
      }
    } else {
      Alert.alert('Algo deu errado', "Desculpe pela inconveniência", [{ text: 'OK' }])
    }

  }


  const dispatch = useDispatch();

  const load = useCallback(async () => {
    setDeuErro(null)
    setRefreshing(true)
    try {
      await dispatch(authAction.fetchManagers())
      try {
        await dispatch(productActions.fetchProducts())

      } catch (e) {
        setDeuErro(e);
        console.log(e)
      }
      setRefreshing(false)
    } catch (e) {
      throw e;
    }


  }, [dispatch])

  useEffect(() => {
    const willFoc = props.navigation.addListener('willFocus', load)

    return () => {
      willFoc.remove()
    }
  }, [load])

  useEffect(() => {
    setIsLoading(true)
    load().then(() => { setIsLoading(false) })

  }, [dispatch])

  const onViewDetail = (id, title) => {
    props.navigation.navigate('ProductDetail', { productId: id, productTitle: title })
  }

  if (deuErro) {
    return (

      <View style={styles.loader}>
        <Text>Algo deu errado</Text>
      </View>
    )
  }

  if (isLoading) {
    return (

      <View style={styles.loader}>
        <ActivityIndicator size='large' color='blue' />

      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (

      <View style={styles.loader}>
        <View style={styles.btn}>
          <Button title="Organizador" onPress={() => {
            isAdm()
            console.log('cliquei')
          }} />
        </View>
        <Text>Eventos não encontrados, adicione novos eventos</Text>
      </View>
    )
  }


  return (
    <View>
      <View style={styles.btn}>
        <Button title="Organizador" onPress={() => {
          isAdm()
        }} />
      </View>

      <FlatList
        onRefresh={load}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData =>
          <ProductItem
            onViewDetail={() => { onViewDetail(itemData.item.id, itemData.item.title) }}
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price.toFixed(2)}
          >

            <Button title="Detalhes" color={Colors.secondary} onPress={() => { onViewDetail(itemData.item.id, itemData.item.title) }} />
            <Button title="Adicionar no Carrinho" color={Colors.secondary} onPress={() => {
              dispatch(cartActions.addToCart(itemData.item))
            }} />
          </ProductItem>
        } />
    </View>
  )
}


ProductsOverview.navigationOptions = navData => {

  return {
    headerTitle: "Ingressos",
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Cart' iconName='md-cart' onPress={() => {
        navData.navigation.navigate('CartScreen')
      }} />
    </HeaderButtons>,
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
  },
  btn: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    width: "35%",
    padding: 5,
    right: 0
  }
})

export default ProductsOverview;