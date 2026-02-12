import React, {useState, useCallback} from 'react';
import {TextInput, ScrollView, StyleSheet, Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {getCustomerById} from '../database/customersRepo';
import AppButton from '../components/AppButton';
import {updateCustomer} from '../database/customersRepo';
import DeviceDropdown from '../components/DeviceDropdown';
import {DEFAULT_CATEGORIES} from '../screens/SettingsScreen';
import {todayJalali} from '../utils/persianCalendar';

export default function CustomerEditScreen({route, navigation}) {
  const {id} = route.params;
  const [form, setForm] = useState(null);
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const storedCategories = await AsyncStorage.getItem('CATEGORIES');

    setCategories(
      storedCategories ? JSON.parse(storedCategories) : DEFAULT_CATEGORIES,
    );
  };
  useFocusEffect(
    useCallback(() => {
      loadCategories();
      getCustomerById(id).then(setForm);
      setForm({
        ...form,
        date: todayJalali(),
      });
    }, []),
  );

  if (!form) return null;

  console.log('Form: ', form);

  const save = async () => {
    await updateCustomer(form);
    navigation.navigate('خانه');
  };

  return (
    <ScrollView style={{padding: 16}}>
      <TextInput
        placeholder="نام و نام خانوادگی"
        value={form.fullName}
        onChangeText={t => setForm({...form, fullName: t})}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="شماره موبایل"
        placeholderTextColor="#999"
        value={form.phone}
        onChangeText={t => setForm({...form, phone: t})}
        style={styles.input}
      />
      <DeviceDropdown
        value={form.device}
        onSelect={v => setForm({...form, device: v})}
        categories={categories}
      />
      <TextInput
        placeholder="شرح خرابی"
        placeholderTextColor="#999"
        value={form.description}
        onChangeText={t => setForm({...form, description: t})}
        style={styles.input}
      />
      <TextInput
        placeholderTextColor="#999"
        value={form.date}
        onChangeText={t => setForm({...form, date: t})}
        style={styles.input}
      />

      {form.photo && <Image source={{uri: form.photo}} style={styles.image} />}

      <AppButton title="ذخیره تغییرات" onPress={save} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    marginBottom: 20,
    height: 'auto',
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#fff',
    color: '#555',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
