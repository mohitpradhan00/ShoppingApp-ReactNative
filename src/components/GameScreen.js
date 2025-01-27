import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CouponCard from './CouponCard';

const coupons = [
  {id: 1, discount: 10},
  {id: 2, discount: 50},
  {id: 3, discount: 30},
];

const GameScreen = () => {
  const [scratchedCoupons, setScratchedCoupons] = useState(
    new Array(coupons.length).fill(false),
  );
  const [disableAll, setDisableAll] = useState(false);

  const handleScratch = (coupon, index) => {
    const newScratchedCoupons = [...scratchedCoupons];
    newScratchedCoupons[index] = true;
    setScratchedCoupons(newScratchedCoupons);
    setDisableAll(true); // Disable all buttons after one is clicked
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scratch and Win!</Text>
      {coupons.map((coupon, index) => (
        <CouponCard
          key={coupon.id}
          coupon={coupon}
          onScratch={() => handleScratch(coupon, index)}
          isScratched={scratchedCoupons[index]}
          isDisabled={disableAll && !scratchedCoupons[index]} // Disable other buttons if one is clicked
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default GameScreen;