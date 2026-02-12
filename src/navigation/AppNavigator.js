import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from '@react-native-vector-icons/ionicons';

import HomeScreen from '../screens/HomeScreen';
import CustomerFormScreen from '../screens/CustomerFormScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import CustomerEditScreen from '../screens/CustomerEditScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = 'home';
          if (route.name === 'خانه') iconName = 'home';
          if (route.name === 'مشتری‌ها') iconName = 'person-add';
          if (route.name === 'جستجو') iconName = 'search';
          if (route.name === 'تنظیمات') iconName = 'settings';
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#1976d2',
      })}>
      <Tab.Screen name="خانه" component={HomeScreen} />
      <Tab.Screen name="مشتری‌ها" component={CustomerFormScreen} />
      <Tab.Screen name="جستجو" component={SearchScreen} />
      <Tab.Screen name="تنظیمات" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Tabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CustomerDetailScreen"
            component={CustomerDetailScreen}
            options={{title: 'مشخصات مشتری'}}
          />
          <Stack.Screen
            name="CustomerEdit"
            component={CustomerEditScreen}
            options={{title: 'ویرایش مشخصات مشتری'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
