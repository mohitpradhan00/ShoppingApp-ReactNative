import React, {createContext, useState, useContext} from 'react';
import {productsData} from '../Data/ProductData';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const addToCart = product => {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
      setCart(
        cart.map(item =>
          item.name === product.name ? {...item, count: item.count + 1} : item,
        ),
      );
    } else {
      setCart([...cart, {...product, count: 1}]);
    }
  };

  const removeFromCart = productName => {
    setCart(cart.filter(item => item.name !== productName));
  };

  const incrementCount = productName => {
    setCart(
      cart.map(item =>
        item.name === productName ? {...item, count: item.count + 1} : item,
      ),
    );
  };

  const decrementCount = productName => {
    setCart(
      cart.map(item =>
        item.name === productName && item.count > 1
          ? {...item, count: item.count - 1}
          : item,
      ),
    );
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.count,
      0,
    );
    return subtotal - subtotal * (discount / 100);
  };

  const applyPromoCode = code => {
    if (code === 'DISCOUNT10') {
      setDiscount(10); // 10% discount
    } else {
      setDiscount(0);
    }
    setPromoCode(code);
  };

  const proceedToPayment = () => {
    alert('Proceeding to payment...');
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        promoCode,
        discount,
        addToCart,
        removeFromCart,
        incrementCount,
        decrementCount,
        calculateTotal,
        applyPromoCode,
        proceedToPayment,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
