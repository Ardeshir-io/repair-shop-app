import React, {useState, useCallback} from 'react';
import {TextInput, ScrollView, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {getCustomerById, updateCustomer} from '../database/customersRepo';
import AppButton from '../components/AppButton';
import DeviceDropdown from '../components/DeviceDropdown';
import PhotoPicker from '../components/PhotoPicker';
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

  const save = async () => {
    await updateCustomer(form);
    navigation.popToTop();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        keyboardType="phone-pad"
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

      <PhotoPicker
        photo={form.photo}
        onChange={uri => setForm({...form, photo: uri})}
      />
      <AppButton title="ذخیره تغییرات" onPress={save} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    color: '#555',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
