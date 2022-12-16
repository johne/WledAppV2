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
import {DeviceProvider} from './components/DeviceProvider';
import WledStack from './WledStack';

const App = () => {
  return (
    <DeviceProvider>
      <WledStack />
    </DeviceProvider>
  );
};

export default App;
