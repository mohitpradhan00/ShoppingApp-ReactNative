import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {productsData} from '../Data/ProductData';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';

const ProductDetailScreen = ({route, navigation}) => {
  const {productId} = route.params; // Get the productId passed from the previous screen

  // Assuming products is your list of all available products
  const product = productsData.filter(item => item.id == productId)[0]; // Filtering the product based on productId

  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1); // Increase quantity by 1
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1); // Decrease quantity by 1
    }
  };

  const handleAddToCart = () => {
    // Here you would add the product and quantity to the cart
    Alert.alert(`Added ${quantity} item(s) of ${product.name} to the cart.`);
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found!</Text>
      </View>
    );
  }

  // Wrap product data in an array for FlatList
  const productList = [product];

  return (
    <FlatList
      data={productList} // Pass the product as an array
      renderItem={({item}) => (
        <View style={styles.container}>
          <ReactNativeZoomableView
            maxZoom={3}
            minZoom={1}
            contentWidth={300} // Adjust based on your image dimensions
            contentHeight={300} // Adjust based on your image dimensions
          >
            <Image source={{uri: item.image}} style={styles.image} />
          </ReactNativeZoomableView>

          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>
            Rs {item.price}
            <Text style={styles.cutprice}> {product.price + 20}</Text>
          </Text>
          <Text style={styles.description}>{item.description}</Text>

          {/* Add to Cart Section */}
          <View style={styles.addToCartContainer}>
            {/* Quantity Selector */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={handleDecreaseQuantity}
                style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={handleIncreaseQuantity}
                style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Add to Cart Button */}
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={item => item.id.toString()} // Ensure unique key for each item
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginTop: 5,
  },
  cutprice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
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
  quantityButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 20,
    color: '#333',
  },
  addToCartContainer: {
    marginTop: 20,
  },
  addToCartButton: {
    backgroundColor: '#ed5d28',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
