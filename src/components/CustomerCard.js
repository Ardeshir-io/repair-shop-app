import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default function CustomerCard({customer, onPress}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {customer.photo && (
        <Image source={{uri: customer.photo}} style={styles.image} />
      )}
      <View style={styles.container}>
        <Text style={styles.text}>نام مشتری:‌ {customer.fullName}</Text>
        <Text style={styles.text}>شماره تماس:‌ {customer.phone}</Text>
        <Text style={styles.text}>نوع دستگاه: {customer.device}</Text>
        <Text style={styles.text}>
          رنگ و مدل دستگاه: {customer.deviceTypeColor}
        </Text>
        <Text style={styles.text}>تاریخ ثبت سفارش: {customer.orderDate}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 6,
    borderRadius: 8,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});
