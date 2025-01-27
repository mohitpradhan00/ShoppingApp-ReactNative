import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useCategory} from '../context/CategoryContext'; 
import {useNavigation} from '@react-navigation/native';

const Categories = () => {
  const {selectedCategory, setSelectedCategory} = useCategory(); 
  const navigation = useNavigation();
  // Handle category button press
  const handleCategoryPress = category => {
    setSelectedCategory(category); 
    if (category === "Men's") {
      navigation.navigate('MenScreen');
    } else if (category === 'All Products') {
      navigation.navigate('Home');
    } else if (category === "Children's") {
      navigation.navigate('ChildrenScreen');
    }else{
      navigation.navigate('Womens');
    } 
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === 'All Products' && styles.activeButton,
          ]}
          onPress={() => handleCategoryPress('All Products')}>
          <Text style={styles.categoryText}>All Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Men's" && styles.activeButton,
          ]}
          onPress={() => handleCategoryPress("Men's")}>
          <Text style={styles.categoryText}>Men's</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Women's" && styles.activeButton,
          ]}
          onPress={() => handleCategoryPress("Women's")}>
          <Text style={styles.categoryText}>Women's</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Children's" && styles.activeButton,
          ]}
          onPress={() => handleCategoryPress("Children's")}>
          <Text style={styles.categoryText}>Children's</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  categoryButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeButton: {
    backgroundColor: '#f7a541', 
  },
});
