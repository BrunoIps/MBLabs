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

  //Aqui são as variáveis que mostram se estou carregando ainda os itens ou se deu algum erro ou se estou recarregando a Tela
  const [isLoading, setIsLoading] = useState(false)
  const [deuErro, setDeuErro] = useState();
  const [isRefreshing, setRefreshing] = useState(false)

  //Variavel que carrega o array de todos os itens disponiveis no BD do firebase.
  const products = useSelector(state => { return state.products.availableProducts })

  //Aqui é uma variavel para ver qual é o email atual que esta sendo logado
  const email = useSelector(state => { return state.auth.atual })

  //Aqui mostra um array com todos as contas criadas, sendo somente email e se ele é Admin(organizador de eventos)
  const manag = useSelector(state => {
    return state.auth.isMod
  })


  //Função onde faço comparação de todo o array de contas criadas  com o email atual logado para ver se a conta atual é Admin
  // para que ele possa ou não ir para a area de criação de novos produtos.

  // useEffect(() => {
  //   props.navigation.setParams({ isAdm: isAdm })
  // infelizmente aqui nao deu certo ....
  // }, [isAdm])

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

  //Carrega todos os produtos e os Managers do BD, seta as variaveis de erro ou de carregamento/recarregamento da pagina
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

  //listener para ver se o usuário esta tentando recarregar a pagina
  useEffect(() => {
    const willFoc = props.navigation.addListener('willFocus', load)

    return () => {
      willFoc.remove()
    }
  }, [load])

  //Aqui eu seto a variavel que mostra se a pagina ja terminou de carregar. 
  useEffect(() => {
    setIsLoading(true)
    load().then(() => { setIsLoading(false) })

  }, [dispatch])

  //Passar as informaçoes necessarias para navegar para a pagina de detalhes do produto.
  const onViewDetail = (id, title) => {
    props.navigation.navigate('ProductDetail', { productId: id, productTitle: title })
  }


  //Se der algum erro vai retonar essa mensagem para o usuário.
  if (deuErro) {
    return (
      <View style={styles.loader}>
        <Text>Algo deu errado</Text>
      </View>
    )
  }

  //enquanto a pagina esta carregando/recarregando mostra esse indicador de atividade
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' color='blue' />
      </View>
    )
  }


  //Aqui é uma mensagem caso tenha ocorrido tudo certo mas nao tenha nenhum produto ainda no BD
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

  //Aqui é caso tudo deu certo e tem produtos no BD.
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
            price={itemData.item.price}
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
  // const admHandler = navData.navigation.getParam('isAdm')

  //Aqui é o titulo do Header, e os botões que aparecem no Header
  return {
    headerTitle: "Ingressos",
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Cart' iconName='md-cart' onPress={() => {
        navData.navigation.navigate('CartScreen')
      }} />
      {/* <Item title='Cart' iconName='md-cart' onPress={admHandler} /> */}
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