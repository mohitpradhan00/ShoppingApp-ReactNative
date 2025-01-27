import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CouponCard = ({coupon, onScratch, isScratched, isDisabled}) => {
  const [scratched, setScratched] = useState(isScratched);

  return (
    <TouchableOpacity
      style={[
        styles.couponCard,
        {backgroundColor: scratched ? 'green' : isDisabled ? 'gray' : 'red'},
      ]}
      onPress={() => {
        if (!scratched && !isDisabled) {
          setScratched(true);
          onScratch(coupon);
        }
      }}
      disabled={isDisabled}>
      {scratched ? (
        <Text style={styles.discountText}>{coupon.discount}% OFF</Text>
      ) : (
        <Text style={styles.scratchText}>Scratch me!</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  couponCard: {
    padding: 20,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  scratchText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default CouponCard;
