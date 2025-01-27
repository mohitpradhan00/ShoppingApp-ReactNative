import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCart} from '../context/CartContext';
import {useWishlist} from '../context/WishListContext'; 

const ProductCard = ({product}) => {
  const {addToCart} = useCart();
  const {wishlist, toggleWishlist} = useWishlist(); 
  const [isInWishlist, setIsInWishlist] = useState(false); 
  const navigation = useNavigation();

  useEffect(() => {
    // Check if the product is already in the wishlist
    setIsInWishlist(wishlist.some(item => item.id === product.id));
  }, [wishlist, product.id]);

  const handleProductPress = () => {
    navigation.navigate('ProductDetailScreen', {productId: product.id}); 
  };

  const handleAddToCart = () => {
    const quantity = 1;
    addToCart(product, quantity);
  };

  const handleWishlistPress = () => {
    toggleWishlist(product); 
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.imageWrapper}
        onPress={handleProductPress}>
        <Image source={{uri: product.image}} style={styles.image} />
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>10%off</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>
        ₹{product.price}{' '}
        <Text style={styles.cutprice}>
          {' '}
          {product.price + 0.1 * product.price}
        </Text>
      </Text>

      {/* Wishlist Heart Button */}
      <TouchableOpacity
        onPress={handleWishlistPress}
        style={styles.wishlistButton}>
        <Text
          style={[
            styles.wishlistText,
            {color: isInWishlist ? '#ff4d4d' : '#888'},
          ]}>
          {isInWishlist ? '❤️' : '🤍'} 
        </Text>
      </TouchableOpacity>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1, // Take up equal space in grid
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 0.5,
    padding: 15,
    margin: 5, // Add margin for spacing between cards
    alignItems: 'center',
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
    color: 'green',
  },
  cutprice: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
    textDecorationLine: 'line-through',
  },
  button: {
    backgroundColor: '#ed5d28',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartBadge: {
    position: 'absolute',
    top: -1,
    left: 1,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 40,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  wishlistText: {
    fontSize: 24, // Adjust size of the heart symbol
    fontWeight: 'bold',
  },
});

export default ProductCard;
