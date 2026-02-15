import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DEFAULT_CATEGORIES = [
  'جاروبرقی',
  'تلویزیون',
  'وسایل سرمایشی',
  'وسایل گرمایشی',
  'وسایل آشپزخانه',
];

// const DEFAULT_REQUIRED_FIELDS = {
//   firstName: true,
//   lastName: true,
//   phone: true,
//   deviceModel: true,
//   deviceColor: true,
//   category: true,
// };

export default function SettingsScreen() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  // const [requiredFields, setRequiredFields] = useState({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const storedCategories = await AsyncStorage.getItem('CATEGORIES');
    // const storedRequired = await AsyncStorage.getItem('REQUIRED_FIELDS');

    setCategories(
      storedCategories ? JSON.parse(storedCategories) : DEFAULT_CATEGORIES,
    );
    // setRequiredFields(
    //   storedRequired ? JSON.parse(storedRequired) : DEFAULT_REQUIRED_FIELDS,
    // );
  };

  const saveCategories = async list => {
    setCategories(list);
    await AsyncStorage.setItem('CATEGORIES', JSON.stringify(list));
  };

  // const saveRequiredFields = async obj => {
  //   setRequiredFields(obj);
  //   await AsyncStorage.setItem('REQUIRED_FIELDS', JSON.stringify(obj));
  // };

  const addCategory = () => {
    if (!newCategory.trim()) {
      return;
    }

    if (categories.includes(newCategory)) {
      Alert.alert('خطا', 'این گروه قبلاً وجود دارد');
      return;
    }

    const updated = [...categories, newCategory];
    saveCategories(updated);
    setNewCategory('');
  };

  const removeCategory = cat => {
    Alert.alert('حذف گروه', 'آیا از حذف این گروه مطمئن هستید؟', [
      {text: 'انصراف', style: 'cancel'},
      {
        text: 'بله! گروه حذف شود',
        style: 'destructive',
        onPress: () => {
          const updated = categories.filter(c => c !== cat);
          saveCategories(updated);
        },
      },
    ]);
  };

  // const toggleRequired = key => {
  //   const updated = {...requiredFields, [key]: !requiredFields[key]};
  //   saveRequiredFields(updated);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ مدیریت برنامه</Text>
      {/*
      <Text style={styles.section}>فیلدهای ضروری ثبت مشتری</Text>

      {Object.keys(requiredFields).map(key => (
        <View key={key} style={styles.row}>
          <Switch
            trackColor={{true: '#b3dbc9', false: '#bbbbbb'}}
            value={requiredFields[key]}
            onValueChange={() => toggleRequired(key)}
          />
          <Text style={{color: '#000'}}>{key}</Text>
        </View>
      ))} */}

      <Text style={styles.subtitle}>گروه لوازم خانگی</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.addBtn} onPress={addCategory}>
          <Text style={styles.addBtnTxt}>افزودن</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="گروه جدید"
          placeholderTextColor="#555"
          value={newCategory}
          onChangeText={setNewCategory}
          style={styles.input}
        />
      </View>

      <FlatList
        data={categories}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.categoryRow}>
            <TouchableOpacity
              style={styles.delBtn}
              onPress={() => removeCategory(item)}>
              <Text style={styles.delBtnTxt}>حذف</Text>
            </TouchableOpacity>
            <Text style={styles.itemTxt}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#000'},
  subtitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    color: '#000',
  },
  input: {
    color: '#555',
    borderWidth: 1,
    flex: 1,
    padding: 8,
    marginLeft: 8,
    borderRadius: 6,
  },
  addBtn: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 6,
  },
  addBtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  delBtn: {
    backgroundColor: '#ef0000',
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 6,
  },
  delBtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  itemTxt: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
