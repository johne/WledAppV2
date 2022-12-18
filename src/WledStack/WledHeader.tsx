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
import {Image, TouchableOpacity, View} from 'react-native';
import {StackHeaderProps} from '@react-navigation/stack';

const WledHeader: React.FC<StackHeaderProps> = ({navigation, back}) => {
  const buttonProps = {
    source: back ? require('../images/icon_back.png') : undefined,
  };

  return (
    <View
      style={{
        backgroundColor: '#333333',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() => (back ? navigation.goBack() : undefined)}>
        <Image
          {...buttonProps}
          style={{height: 40, width: 40, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
      <Image
        source={require('../images/wled_logo.png')}
        style={{
          alignSelf: 'center',
          height: 40,
          width: 200,
          resizeMode: 'contain',
        }}
      />
      <Image
        style={{
          height: 40,
          width: 40,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

export default WledHeader;
