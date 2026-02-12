import React, {useState, useMemo, useCallback} from 'react';
import {Text, TextInput, ScrollView, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import PhotoPicker from '../components/PhotoPicker';
import DeviceDropdown from '../components/DeviceDropdown';
import AppButton from '../components/AppButton';
// import AudioRecorder from '../components/AudioRecorder';
import {todayJalali} from '../utils/persianCalendar';
import {insertCustomer} from '../database/customersRepo';
import {DEFAULT_CATEGORIES} from '../screens/SettingsScreen';

export default function CustomerFormScreen({navigation}) {
  const initialForm = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      phone: '',
      device: '',
      description: '',
      photo: null,
      audio: null,
      date: todayJalali(),
    }),
    [],
  );

  const [form, setForm] = useState(initialForm);
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
      setForm({
        ...initialForm,
      });
    }, [initialForm]),
  );

  const save = async () => {
    if (!form.phone) {
      Alert.alert('خطا', 'شماره موبایل الزامی است');
      return;
    }

    await insertCustomer({
      ...form,
      fullName: `${form.firstName} ${form.lastName}`,
    });

    Alert.alert('ثبت شد', 'مشتری با موفقیت ثبت شد');
    navigation.navigate('خانه');
  };

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: tabBarHeight}}>
      <Text style={styles.title}>ثبت مشتری جدید</Text>

      <TextInput
        placeholder="نام"
        value={form.firstName}
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={t => setForm({...form, firstName: t})}
      />

      <TextInput
        placeholder="نام خانوادگی"
        value={form.lastName}
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={t => setForm({...form, lastName: t})}
      />

      <TextInput
        placeholder="شماره موبایل"
        value={form.phone}
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        style={styles.input}
        onChangeText={t => setForm({...form, phone: t})}
      />

      <DeviceDropdown
        value={form.device}
        onSelect={v => setForm({...form, device: v})}
        categories={categories}
      />

      <TextInput
        placeholder="شرح خرابی"
        value={form.description}
        placeholderTextColor="#999"
        multiline
        style={[styles.input, {height: 80}]}
        onChangeText={t => setForm({...form, description: t})}
      />
      <TextInput
        placeholder="تاریخ"
        value={form.date}
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={t => setForm({...form, date: t})}
      />

      <PhotoPicker
        photo={form.photo}
        onChange={uri => setForm({...form, photo: uri})}
      />

      {/* <AudioRecorder onFinish={path => setForm({...form, audio: path})} /> */}

      <AppButton title="ثبت مشتری" onPress={save} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16, backgroundColor: '#f2f2f2'},
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#555'},
  input: {
    backgroundColor: '#fff',
    color: '#555',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
