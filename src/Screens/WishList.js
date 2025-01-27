import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useWishlist} from '../context/WishListContext';
import ProductCard from '../components/ProductCard';

const WishlistScreen = () => {
  const {wishlist} = useWishlist(); 

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty!</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ProductCard product={item} />} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});

export default WishlistScreen;
