import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navbar from './src/components/Navbar';
import SearchScreen from './src/Screens/SearchScreen';
import HomeScreen from './src/Screens/HomeScreen';
import MenScreen from './src/Screens/MenScreen';
import SingleProductSCreen from './src/Screens/SingleProductScreen';
import CartScreen from './src/Screens/CartScreen';
import WomenScreen from './src/Screens/WomenScreen';
import ProductDetailScreen from './src/Screens/ProductScreen';
import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishListContext';
import WishlistScreen from './src/Screens/WishList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            {/* Navbar */}
            <Navbar />

            {/* Stack Navigator */}
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="MenScreen" component={MenScreen} />
              <Stack.Screen name="WomenScreen" component={WomenScreen} />
              <Stack.Screen name="wishlist" component={WishlistScreen} />
              <Stack.Screen
                name="SingleScreen"
                component={SingleProductSCreen}
              />
              <Stack.Screen name="cart" component={CartScreen} />
              <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </WishlistProvider>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
