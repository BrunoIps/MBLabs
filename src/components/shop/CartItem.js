import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.qtd}>{props.quantity} - </Text>
        <Text style={styles.defaultText}>{props.title}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.defaultText}>{props.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteBtn}>
          <Ionicons name="ios-trash" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  qtd: {
    fontFamily: 'open-sans',
    color: "#888",
    fontSize: 16,
    marginRight: 50,
  },
  defaultText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  deleteBtn: {
    marginLeft: 20
  },
});

export default CartItem;