import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import ProductCard from '../components/ProductCard'; 
import {fetchProducts} from '../api/Contentful';
import { productsData } from '../Data/ProductData';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import BannerCarousel from '../components/BannerCarousel';

const WomenScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenProducts = async () => {
      try {
        // const allProducts = await fetchProducts();
        // console.log('Fetched Products:', allProducts); // Debugging
        const womenProducts = productsData.filter(
          product => product.category?.toLowerCase() === 'women',
        );
        setProducts(womenProducts);
      } catch (error) {
        console.error('Error fetching women products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMenProducts();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (products.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noProductsText}>No products found for Women.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BannerCarousel />
      <Categories />
      <FlatList
        data={products}
        keyExtractor={item => item.id || item.sys?.id} 
        renderItem={({item}) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContent}
      />
      {/* <Footer /> */}
    </SafeAreaView>
  );
};

export default WomenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Roboto',
  },
  noProductsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  listContent: {
    padding: 10,
  },
});
