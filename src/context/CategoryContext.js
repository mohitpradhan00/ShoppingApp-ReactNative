import React, {createContext, useState, useContext} from 'react';


const CategoryContext = createContext();


export const CategoryProvider = ({children}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  const value = {
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
