import React, {createContext, useState, useContext} from 'react';

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

  const toggleWishlist = item => {
    if (wishlist.some(existingItem => existingItem.id === item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <WishlistContext.Provider value={{wishlist, toggleWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => useContext(WishlistContext);
