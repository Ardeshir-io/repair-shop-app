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
      recipientName: '',
      device: '',
      deviceTypeColor: '',
      description: '',
      amount: '',
      amountPaid: '',
      photo: null,
      // audio: null,
      orderDate: todayJalali(),
      repairDate: todayJalali(),
      deliveryDate: todayJalali(),
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
    if (!form.lastName) {
      Alert.alert('خطا', 'نام خانوادگی الزامی است');
      return;
    }
    if (!form.phone) {
      Alert.alert('خطا', 'شماره موبایل الزامی است');
      return;
    }
    try {
      await insertCustomer({
        ...form,
        fullName: `${form.firstName} ${form.lastName}`,
      });
      Alert.alert('ثبت شد', 'مشتری با موفقیت ثبت شد');
      navigation.navigate('خانه');
    } catch (error) {
      Alert.alert('خطا', 'مشتری ثبت نشد! لطفا دوباره تلاش کنید');
      console.log(error);
    }
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

      <TextInput
        placeholder="فرد تحویل گیرنده"
        value={form.recipientName}
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={r => setForm({...form, recipientName: r})}
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
        placeholder="هزینه تعمیر (هزار تومان)"
        value={form.amount}
        placeholderTextColor="#999"
        keyboardType="decimal-pad"
        style={styles.input}
        onChangeText={a => setForm({...form, amount: a})}
      />

      <TextInput
        placeholder="مبلغ دریافتی (هزار تومان)"
        value={form.amountPaid}
        placeholderTextColor="#999"
        keyboardType="decimal-pad"
        style={styles.input}
        onChangeText={ap => setForm({...form, amountPaid: ap})}
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
