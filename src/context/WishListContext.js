import React, {createContext, useState, useContext} from 'react';
import ProductCard from '../components/ProductCard';

const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = item => {
    setWishlist(prevWishlist => [...prevWishlist, item]);
  };

  
  const removeFromWishlist = itemId => {
    setWishlist(prevWishlist =>
      prevWishlist.filter(item => item.id !== itemId),
    );
  };

  return (
    <WishlistContext.Provider
      value={{wishlist, addToWishlist, removeFromWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook 
export const useWishlist = () => useContext(WishlistContext);
