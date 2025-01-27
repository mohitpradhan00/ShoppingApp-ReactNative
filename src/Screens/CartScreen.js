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
  TextInput,
} from 'react-native';
import {useCart} from '../context/CartContext';

const CartScreen = () => {
  const {
    cart, 
    incrementCount,
    decrementCount,
    removeFromCart,
    calculateTotal,
    applyPromoCode,
    proceedToPayment,
  } = useCart();

  const [enteredPromoCode, setEnteredPromoCode] = useState('');

  // Handle promo code
  const handlePromoCodeChange = e => {
    setEnteredPromoCode(e);
  };

  const handleApplyPromoCode = () => {
    applyPromoCode(enteredPromoCode);
    setEnteredPromoCode('');
  };

  // Render each cart item
  const renderCartItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemText}>{item.name}</Text>
        <Text style={styles.cartItemText}>₹{item.price}</Text>
        <View style={styles.cartItemActions}>
          <TouchableOpacity onPress={() => decrementCount(item.name)}>
            <Text style={styles.cartItemButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cartItemQuantity}>{item.count}</Text>
          <TouchableOpacity onPress={() => incrementCount(item.name)}>
            <Text style={styles.cartItemButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.name)}>
        <Text style={styles.cartItemRemove}>X</Text>
      </TouchableOpacity>
      <Text style={styles.cartItemTotal}>₹{item.price * item.count}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart} // Using 'cart' from context
          keyExtractor={item => item.id.toString()}
          renderItem={renderCartItem}
          contentContainerStyle={styles.cartList}
        />
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>

        {/* Promo code section */}
        <TextInput
          style={styles.promoInput}
          value={enteredPromoCode}
          onChangeText={handlePromoCodeChange}
          placeholder="Enter Promo Code"
        />
        <TouchableOpacity
          onPress={handleApplyPromoCode}
          style={styles.promoButton}>
          <Text style={styles.promoButtonText}>Apply</Text>
        </TouchableOpacity>

        <Button title="Proceed to Checkout" onPress={proceedToPayment} />
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
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
  },
  cartItemQuantity: {
    fontSize: 20,
    color: '#333',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'contain',
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
    width: '50%',
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
    color: 'black',
    fontWeight: 'bold',
  },
  cartItemTotal: {
    fontWeight: 'bold',
    color: 'green',
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
