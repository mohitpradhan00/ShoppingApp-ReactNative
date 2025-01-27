import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.footerText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('MenScreen')}>
          <Text style={styles.footerText}>Men</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('WomenScreen')}>
          <Text style={styles.footerText}>Women</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 80,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ed5d28',
    paddingVertical: 10,
    elevation: 5,
    borderRadius: 50,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
