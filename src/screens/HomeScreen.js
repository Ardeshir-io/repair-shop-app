import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import CustomerCard from '../components/CustomerCard';
import {getCustomers, initDB} from '../database/customersRepo';

export default function HomeScreen({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    initDB().then(load);
    const unsub = navigation.addListener('focus', load);
    return unsub;
  }, []);

  const load = async () => {
    const res = await getCustomers();
    setData(res);
  };

  return (
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
  );
}
