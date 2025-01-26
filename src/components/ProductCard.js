import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const ProductCard = ({product}) => {
  const {addToCart} = useCart();
  const navigation = useNavigation();
  
  const handleProductPress = () => {
     navigation.navigate('ProductDetailScreen', {productId: product.id}); // Pass product id or entire product as a parameter
   };

  const handleAddToCart = () => {
     const quantity = 1; 
     addToCart(product, quantity); 
   };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.imageWrapper}
        onPress={handleProductPress}>
        <Image source={{uri: product.image}} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>
        Rs {product.price} <Text style={styles.cutprice}> {product.price+20}</Text>
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1, // Take up equal space in grid
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 5, // Add margin for spacing between cards
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
  },
  imageWrapper: {
    width: '100%', 
    height: 120, 
    borderRadius: 10,
    marginBottom: 10, 
    overflow: 'hidden', 
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    color:'green'
  },
  cutprice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textDecorationLine:'line-through'
  },
  button: {
    backgroundColor: '#ed5d28',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductCard;
