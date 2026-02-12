import React, {useState} from 'react';
import {View, TextInput, FlatList, StyleSheet} from 'react-native';
import {searchCustomers} from '../database/customersRepo';
import CustomerCard from '../components/CustomerCard';

export default function SearchScreen({navigation}) {
  const [q, setQ] = useState('');
  const [data, setData] = useState([]);

  const search = async text => {
    setQ(text);
    const res = await searchCustomers(text);
    setData(res);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="جستجو (نام مشتری، موبایل، دستگاه)"
        placeholderTextColor={'#000'}
        value={q}
        onChangeText={search}
        style={styles.input}
      />

      <FlatList
        data={data}
        keyExtractor={i => i.id.toString()}
        renderItem={({item}) => (
          <CustomerCard
            customer={item}
            onPress={() =>
              navigation.navigate('CustomerDetailScreen', {id: item.id})
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    backgroundColor: '#fff',
    color: '#555',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
