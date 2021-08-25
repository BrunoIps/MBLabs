import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CartItem from './CartItem';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>R$ {props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>

      </View>
      <Button title={showDetails ? "Hide Details" : "Details"} onPress={() => {
        setShowDetails(prevState => !prevState)
      }} />
      {showDetails && <View style={styles.detail}>
        {props.items.map((cartItem, index) => <CartItem key={index} isDeletable={false} quantity={cartItem.quantity} amount={cartItem.sum} title={cartItem.productTitle} />)}
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  orderItem: {
    padding: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20
  },
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  amount: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: 'red'
  },
  detail: {
    marginTop: 5,
    width: "100%"
  }
})

export default OrderItem