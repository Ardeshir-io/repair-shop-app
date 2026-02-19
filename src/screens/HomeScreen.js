import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomerCard from '../components/CustomerCard';
import {getCustomers, initDB} from '../database/customersRepo';
import {DEFAULT_CATEGORIES} from './SettingsScreen';

export default function HomeScreen({navigation}) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('All');

  useEffect(() => {
    initDB().then(() => {
      loadCustomers();
      loadCategories();
    });

    const unsub = navigation.addListener('focus', () => {
      loadCustomers();
      loadCategories();
    });

    return unsub;
  }, [navigation]);

  const loadCustomers = async () => {
    const res = await getCustomers();
    setData(res);
    setFiltered(res);
  };

  const loadCategories = async () => {
    const stored = await AsyncStorage.getItem('CATEGORIES');
    const list = stored ? JSON.parse(stored) : DEFAULT_CATEGORIES;
    setCategories(['همه', ...list]);
  };

  const filter = cat => {
    setSelected(cat);
    if (cat === 'All') {
      setFiltered(data);
    } else {
      setFiltered(data.filter(i => i.device === cat));
    }
  };

  return (
    <View>
      {/* category bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.catBar}>
        {categories.map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.catBtn, selected === c && styles.catActive]}
            onPress={() => filter(c)}>
            <Text
              style={selected === c ? styles.catTextActive : styles.catText}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* list */}
      <FlatList
        data={filtered}
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
  catBar: {
    padding: 10,
    backgroundColor: '#fff',
  },

  catBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  catActive: {
    backgroundColor: '#1976d2',
  },

  catText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
  },

  catTextActive: {
    color: '#fff',
    fontSize: 16,
  },
});
