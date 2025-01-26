import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishListContext';

const Navbar = () => {
  const { cart } = useCart();
  const {wishlist} = useWishlist();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.navbar}>
      {/* Search Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Image
          source={{
            uri: 'https://www.pngall.com/wp-content/uploads/8/Vector-Search.png',
          }}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Brand Name */}
      <TouchableOpacity
        style={styles.brand}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.brandName}>Snoopy</Text>
      </TouchableOpacity>

      {/* Icons Container */}
      <View style={styles.iconsContainer}>
        {/* WishList Icon */}
        <View style={styles.cartIconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('wishlist')}>
            <Image
              source={{
                uri: 'https://png.pngtree.com/template/20191025/ourmid/pngtree-love-interface-line-vector-single-icon-image_319675.jpg',
              }}
              style={styles.icon}
            />
            {wishlist.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Cart Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('cart')}>
          <View style={styles.cartIconContainer}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=2048x2048&w=is&k=20&c=Z3Qy1_NQNpXKAYgfmbgSJrNFqRzUrzY-5kUtGTkf29Q=',
              }}
              style={styles.icon}
            />
            {/* Cart Length Badge */}
            {/* {cart.length  && ( */}
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{2}</Text>
              </View>
            {/* )} */}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  brand: {
    marginTop: '3%',
  },
  brandName: {
    color: '#ed5d28',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1, // This ensures the brand name takes up all available space in the center
    textAlign: 'center', // Centers the brand name horizontally
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:5,
  },
  icon: {
    width: 25,
    height: 35,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Navbar;
