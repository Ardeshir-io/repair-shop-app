import React, {useState} from 'react';
import AppButton from './AppButton';
import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const requestMicPermission = async () => {
  if (Platform.OS !== 'android') return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    {
      title: 'دسترسی به میکروفن',
      message: 'برای ضبط صدا، اپ نیاز به دسترسی به میکروفن دارد',
      buttonPositive: 'باشه',
      buttonNegative: 'لغو',
    },
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};
const recorder = new AudioRecorderPlayer();

export default function AudioRecorder({onFinish}) {
  const [recording, setRecording] = useState(false);

  const start = async () => {
    const hasPermission = await requestMicPermission();
    if (!hasPermission) return;

    setRecording(true);

    const path =
      Platform.OS === 'android' ? 'sdcard/recording.m4a' : 'recording.m4a';

    await recorder.startRecorder(path);
  };

  // const start = async () => {
  //   setRecording(true);
  //   await recorder.startRecorder();
  // };

  const stop = async () => {
    const path = await recorder.stopRecorder();
    recorder.removeRecordBackListener();
    setRecording(false);
    onFinish(path);
  };

  return (
    <View style={{marginVertical: 10}}>
      <Text style={{color: '#555', marginBottom: 10}}>توضیح صوتی:</Text>
      {!recording ? (
        <AppButton title="شروع ضبط" onPress={start} />
      ) : (
        <AppButton title="پایان ضبط" onPress={stop} />
      )}
    </View>
  );
}
