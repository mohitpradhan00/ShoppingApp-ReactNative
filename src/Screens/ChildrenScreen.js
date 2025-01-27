import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Categories from '../components/Categories';
import BannerCarousel from '../components/BannerCarousel';

const ChildrenScreen = () => {
  return (
    <View>
      <BannerCarousel />
      <Categories />
      <Text>ChildrenScreen</Text>
    </View>
  );
}

export default ChildrenScreen

const styles = StyleSheet.create({})