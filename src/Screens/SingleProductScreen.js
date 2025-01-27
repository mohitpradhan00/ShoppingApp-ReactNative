import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Button} from 'react-native';

const SingleProductSCreen = ({route, navigation}) => {
  const {product} = route.params; 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>Rs {product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Button
        title="Add to Cart"
        onPress={() => {
          console.log('Product added to cart:', product.name);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 18,
    color: '#ed5d28',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
});

export default SingleProductSCreen;
