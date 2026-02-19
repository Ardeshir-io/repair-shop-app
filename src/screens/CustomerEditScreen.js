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

      <TextInput
        placeholder="فرد تحویل گیرنده"
        value={form.recipientName}
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={rn => setForm({...form, recipientName: rn})}
      />

      <DeviceDropdown
        value={form.device}
        onSelect={v => setForm({...form, device: v})}
        categories={categories}
      />

      <TextInput
        placeholder="رنگ و مدل دستگاه مشتری"
        value={form.deviceTypeColor}
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={dt => setForm({...form, deviceTypeColor: dt})}
      />

      <TextInput
        placeholder="هزینه تعمیر (تومان)"
        value={form.amount}
        placeholderTextColor="#999"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={a => setForm({...form, amount: a})}
      />

      <TextInput
        placeholder="مبلغ دریافتی (تومان)"
        value={form.amountPaid}
        placeholderTextColor="#999"
        keyboardType="decimal-pad"
        style={styles.input}
        onChangeText={ap => setForm({...form, amountPaid: ap})}
      />

      <TextInput
        placeholder="شرح خرابی"
        placeholderTextColor="#999"
        value={form.description}
        onChangeText={t => setForm({...form, description: t})}
        style={styles.input}
      />
      <TextInput
        placeholder="تاریخ ثبت سفارش"
        value={form.orderDate}
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={od => setForm({...form, orderDate: od})}
      />

      <TextInput
        placeholder="تاریخ تعمیر دستگاه"
        value={form.repairDate}
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={rd => setForm({...form, repairDate: rd})}
      />

      <TextInput
        placeholder="تاریخ تحویل به مشتری"
        value={form.deliveryDate}
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={dd => setForm({...form, deliveryDate: dd})}
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
