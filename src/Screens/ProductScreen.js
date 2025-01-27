import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useCart} from '../context/CartContext';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {productsData} from '../Data/ProductData';

const ProductDetailScreen = ({route}) => {
  const {productId} = route.params;
  const {addToCart, incrementCount, decrementCount, cart} = useCart();
  const product = productsData.find(item => item.id === productId);
  const cartItem = cart.find(item => item.name === product.name);
  const itemCount = cartItem ? cartItem.count : 0;

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[product]}
      renderItem={({item}) => (
        <View style={styles.container}>
          <ReactNativeZoomableView
            maxZoom={3}
            minZoom={1}
            contentWidth={300}
            contentHeight={300}>
            <Image source={{uri: item.image}} style={styles.image} />
          </ReactNativeZoomableView>

          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>
            ₹{item.price}
            <Text style={styles.cutprice}> ₹{item.price + 20}</Text>
          </Text>
          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.addToCartContainer}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => decrementCount(item.name)}
                style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{itemCount}</Text>
              <TouchableOpacity
                onPress={() => incrementCount(item.name)}
                style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => addToCart(item)}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  image: {width: '100%', height: 300, resizeMode: 'contain'},
  name: {fontSize: 24, fontWeight: 'bold', marginTop: 10},
  price: {fontSize: 18, color: 'green', marginTop: 5},
  cutprice: {fontSize: 14, color: '#888', textDecorationLine: 'line-through'},
  description: {fontSize: 16, color: '#555', marginTop: 10},
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityButton: {
    backgroundColor: '#ed5d28',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  quantityButtonText: {fontSize: 20, color: '#fff', fontWeight: 'bold'},
  quantityText: {fontSize: 20, color: '#333'},
  addToCartButton: {
    backgroundColor: '#ed5d28',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  addToCartText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});

export default ProductDetailScreen;
