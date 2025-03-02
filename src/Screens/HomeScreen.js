import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BannerCarousel from '../components/BannerCarousel';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import fetchProducts from '../api/Contentful';
import { productsData } from '../Data/ProductData';
import Categories from '../components/Categories';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setData(fetchedProducts); 
      } catch (error) {
        setData(productsData);
        // console.error('Error loading products:', error);
      } finally {
        setLoading(false); 
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BannerCarousel />
      <Categories/>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        numColumns={2} // columns
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row} 
        renderItem={({item}) => <ProductCard product={item} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 10, 
  },
  row: {
    justifyContent: 'space-between', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
