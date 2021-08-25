import React from 'react';
import { View, Text, Image, StyleSheet, Button, Platform, TouchableWithoutFeedback, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

const ProductItem = (props) => {

  let Touchable = TouchableWithoutFeedback;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    Touchable = TouchableWithoutFeedback;
  }

  return (
    <Touchable onPress={props.onViewDetail}>
      <View style={styles.product}>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>R${props.price}</Text>
        </View>
        <View style={styles.btns}>
          {props.children}
        </View>

      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 15,
    backgroundColor: '#c9ccd5',
    height: 350,
    margin: 15,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',

  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'

  },
  textContainer: {
    alignItems: 'center',
    height: "20%",
    padding: 10,
  },
  title: {
    fontSize: 16,
    marginVertical: 3,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14,
    fontFamily: 'open-sans-bold'
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '15%'
  }
});

export default ProductItem;

{/* <TouchableWithoutFeedback onPress={props.onViewDetail} useForeground> */ }