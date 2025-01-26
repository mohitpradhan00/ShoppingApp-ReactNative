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
import {productsData} from '../Data/ProductData';
import Footer from '../components/Footer';

const MenScreen = () => {
  const [menProducts, setMenProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // const response = await fetchProducts();
        const fetchedProducts = productsData.filter(
          product => product.category?.toLowerCase() === 'men',
        );
        setMenProducts(fetchedProducts);
      } catch (error) {
        // Fallback to local data if fetch fails
        const fallbackProducts = productsData.filter(
          product => product.category === 'men',
        );
        setMenProducts(fallbackProducts);
        console.error('Error loading products:', error);
      } finally {
        setLoading(false); // Stop the loading state once data is fetched
      }
    };

    loadProducts();
  }, []);

  // Show loading spinner if data is still being fetched
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (menProducts.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noProductsText}>No products found for Men.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>Men's Section</Text>
      <FlatList
        data={menProducts}
        keyExtractor={item => item.id || item.sys?.id} 
        numColumns={2}
        renderItem={({item}) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContent}
      />
      <Footer/>
    </SafeAreaView>
  );
};

export default MenScreen;

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
