/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DeviceList from '../screens/DeviceList';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import DeviceController from '../screens/DeviceController';
import {useDeviceInfo} from '../components/DeviceProvider';
import WledHeader from './WledHeader';

export type StackParams = {
  Devices: undefined;
  Device: undefined;
};

const Stack = createStackNavigator<StackParams>();

export type StackProps = StackScreenProps<StackParams>;

const WledStack = () => {
  const {device} = useDeviceInfo();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: WledHeader,
        }}>
        <Stack.Screen name="Devices" component={DeviceList} />
        <Stack.Screen
          name="Device"
          component={DeviceController}
          options={{
            title: device.name,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WledStack;
