import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
  Image,
} from 'react-native';

// Example Cart Data - in a real app, this would come from global state or local storage
const sampleCartItems = [
  {
    id: 1,
    name: 'Leather Wallet',
    price: 490,
    quantity: 1,
    image: 'https://m.media-amazon.com/images/I/51QF5REihTL._AC_UY1100_.jpg',
  },
  {
    id: 2,
    name: 'Bluetooth Headphones',
    price: 6500,
    quantity: 1,
    image:
      'https://img.tatacliq.com/images/i10/1348Wx2000H/MP000000017346207_1348Wx2000H_202304251122091.jpeg',
  },
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(sampleCartItems);

  // Add to cart - increase quantity
  const increaseQuantity = item => {
    const updatedCart = cartItems.map(cartItem =>
      cartItem.id === item.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem,
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = item => {
    const updatedCart = cartItems.map(cartItem =>
      cartItem.id === item.id && cartItem.quantity > 1
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem,
    );
    setCartItems(updatedCart);
  };

  // Remove from cart
  const removeFromCart = item => {
    const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCart);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  // Proceed to checkout (You can extend this to implement checkout functionality)
  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert(
        'Your cart is empty!',
        'Please add items to your cart before proceeding.',
      );
    } else {
      Alert.alert('Proceeding to Checkout', 'You can now checkout your items.');
    }
  };

  // Render each cart item
  const renderCartItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemText}>{item.name}</Text>
        <Text style={styles.cartItemText}>Rs {item.price}</Text>
        <Text style={styles.cartItemText}>Quantity: {item.quantity}</Text>

        <View style={styles.cartItemActions}>
          <TouchableOpacity onPress={() => increaseQuantity(item)}>
            <Text style={styles.cartItemButton}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => decreaseQuantity(item)}>
            <Text style={styles.cartItemButton}>-</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => removeFromCart(item)}>
          <Text style={styles.cartItemRemove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: Rs {calculateTotal()}</Text>
        <Button title="Proceed to Checkout" onPress={proceedToCheckout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  cartList: {
    flexGrow: 1,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    borderWidth:1,
    borderColor:'black'
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'contain', // Ensures image is contained within its box
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartItemText: {
    fontSize: 16,
    color: '#333',
  },
  cartItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '40%', // Ensure buttons have enough space between them
  },
  cartItemButton: {
    color: '#ed5d28',
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ed5d28',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  cartItemRemove: {
    color: '#ed5d28',
    fontWeight: 'bold',
    marginTop: 10,
  },
  totalContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CartScreen;
