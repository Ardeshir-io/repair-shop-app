import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {} from 'react-native';
import AppButton from './AppButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function PhotoPicker({photo, onChange}) {
  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'دسترسی به دوربین',
        message: 'برای گرفتن عکس، اپ نیاز به دسترسی به دوربین دارد',
        buttonPositive: 'باشه',
        buttonNegative: 'لغو',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const pickImage = async fromCamera => {
    if (fromCamera) {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;
    }

    const result = fromCamera
      ? await launchCamera({mediaType: 'photo', saveToPhotos: true})
      : await launchImageLibrary({mediaType: 'photo'});

    if (!result.didCancel && result.assets?.length) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {photo && <Image source={{uri: photo}} style={styles.image} />}
      <View style={styles.buttonContainer}>
        <AppButton title="گرفتن عکس" onPress={() => pickImage(true)} />
        <AppButton title="انتخاب از گالری" onPress={() => pickImage(false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  buttonContainer: {
    marginVertical: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 8,
  },
});
