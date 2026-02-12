import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {getCustomerById, deleteCustomer} from '../database/customersRepo';
import AppButton from '../components/AppButton';

// const player = new AudioRecorderPlayer();

export default function CustomerDetailScreen({route, navigation}) {
  const {id} = route.params;
  const [c, setC] = useState(null);

  useEffect(() => {
    getCustomerById(id).then(setC);
  }, []);

  if (!c) return null;

  const handleDelete = () => {
    Alert.alert('حذف مشتری', 'آیا از حذف این مشتری مطمئن هستید؟', [
      {text: 'انصراف', style: 'cancel'},
      {
        text: 'حذف',
        style: 'destructive',
        onPress: async () => {
          await deleteCustomer(id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>مشتری محترم: {c.fullName}</Text>
      <Text style={styles.text}>شماره تماس: {c.phone}</Text>
      <Text style={styles.text}>نوع دستگاه: {c.device}</Text>
      <Text style={styles.text}>شرح خرابی:‌{c.description}</Text>
      <Text style={styles.text}>تاریخ تحویل دستگاه:‌ {c.date}</Text>

      {c.photo && <Image source={{uri: c.photo}} style={styles.image} />}

      {/* {c.audio && (
        <Button
          title="▶️ پخش صدا"
          onPress={() => player.startPlayer(c.audio)}
        />
      )} */}

      <View style={styles.buttonsView}>
        <AppButton
          title="ویرایش مشتری"
          onPress={() => navigation.navigate('CustomerEdit', {id})}
        />
        <AppButton title="حذف مشتری" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    marginTop: 20,
    height: 'auto',
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  buttonsView: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#555',
  },
});
