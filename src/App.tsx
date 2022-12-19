/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {DeviceProvider} from './components/DeviceProvider';
import WledStack from './WledStack';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BleManager from 'react-native-ble-manager';

const App = () => {
  useEffect(() => {
    BleManager.start({showAlert: false});
    SplashScreen.hide();
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: '#333333', height: 0}}>
        <StatusBar
          animated={true}
          backgroundColor="#333333"
          barStyle={'light-content'}
          showHideTransition={'slide'}
        />
        <DeviceProvider>
          <WledStack />
        </DeviceProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
