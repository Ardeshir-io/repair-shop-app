import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity,
} from 'react-native';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {getCustomerById, deleteCustomer} from '../database/customersRepo';
import AppButton from '../components/AppButton';
import Icon from '@react-native-vector-icons/ionicons';

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
  const callPhone = phone => {
    Linking.openURL(`tel:${phone}`);
  };

  const sendSMS = phone => {
    Linking.openURL(`sms:${phone}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>مشتری محترم: {c.fullName}</Text>
      {/* <Text style={styles.text}>شماره تماس: {c.phone}</Text> */}
      <View style={styles.phoneRow}>
        <View style={styles.phoneView}>
          <TouchableOpacity onPress={() => callPhone(c.phone)}>
            <Text style={styles.icon}>
              <Icon name="call" size={30} color="#555" />
            </Text>
            {/* <Text style={styles.icon}>📞</Text> */}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => sendSMS(c.phone)}>
            <Text style={styles.icon}>
              <Icon name="mail" size={30} color="#555" />
            </Text>
            {/* <Text style={styles.icon}>✉️</Text> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => callPhone(c.phone)}>
          <Text style={styles.phoneNumberUnderlined}>{c.phone}</Text>
        </TouchableOpacity>
        <Text style={styles.phoneNumber}>شماره تماس:</Text>
      </View>

      <Text style={styles.text}>نام تحویل گیرنده: {c.recipientName}</Text>
      <Text style={styles.text}>گروه دستگاه: {c.device}</Text>
      <Text style={styles.text}>رنگ و مدل دستگاه: {c.deviceTypeColor}</Text>
      <Text style={styles.text}>شرح خرابی:‌ {c.description}</Text>
      <Text style={styles.text}>هزینه تعمیر:‌ {c.amount}</Text>
      <Text style={styles.text}>مبلغ دریافتی:‌ {c.amountPaid}</Text>
      <Text style={styles.text}>تاریخ ثبت سفارش:‌ {c.orderDate}</Text>
      <Text style={styles.text}>تاریخ تعمیر دستگاه:‌ {c.repairDate}</Text>
      <Text style={styles.text}>تاریخ تحویل به مشتری:‌ {c.deliveryDate}</Text>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  image: {
    marginTop: 20,
    height: 'auto',
    width: '100%',
    aspectRatio: 2 / 3,
    marginBottom: 10,
    borderRadius: 8,
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
  phoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  phoneView: {flexDirection: 'row', gap: 10},
  phoneNumber: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#555',
  },
  phoneNumberUnderlined: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0000EE',
    textDecorationColor: '#0000EE',
    textDecorationLine: 'underline',
  },

  icon: {
    fontSize: 26,
    marginRight: 10,
  },
});
