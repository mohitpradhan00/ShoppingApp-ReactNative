import React, {createContext, useState, useContext} from 'react';


const CartContext = createContext();

// Cart provider component
export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      // If the product already exists, update the quantity
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? {...item, quantity: item.quantity + quantity}
          : item,
      );
      setCart(updatedCart);
    } else {
      // If the product doesn't exist, add it to the cart
      setCart([...cart, {...product, quantity}]);
    }
  };

  // Remove product 
  const removeFromCart = productId => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  // Update product quantity 
  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? {...item, quantity} : item,
    );
    setCart(updatedCart);
  };

  //total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
      }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => {
  return useContext(CartContext);
};
