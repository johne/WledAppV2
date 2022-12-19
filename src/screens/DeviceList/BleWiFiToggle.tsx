import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import Device from '../../comms/Device';

interface DeviceListItemProps {
  item: Device;
}

const BleWiFiToggle: React.FC<DeviceListItemProps> = ({item}) => {
  if (!item.hasBle()) {
    return null;
  }

  const isBle = item.getType() === 'ble';
  const isWiFi = item.getType() === 'wifi';

  return (
    <View style={[styles.toggleView]}>
      <TouchableOpacity
        onPress={() => isWiFi && item.toggleBle()}
        disabled={isBle}
        style={[
          styles.buttonContainer,
          {backgroundColor: isBle ? '#707070' : 'transparent'},
        ]}>
        <Image
          source={require('../../images/ble.png')}
          style={[styles.buttonImage]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => isBle && item.toggleBle()}
        disabled={isWiFi}
        style={[
          styles.buttonContainer,
          {backgroundColor: isWiFi ? '#707070' : 'transparent'},
        ]}>
        <Image
          source={require('../../images/wifi.png')}
          style={[styles.buttonImage]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'white',
    borderWidth: 3,
    width: 105,
    height: 52,
    borderRadius: 52 / 2,
    margin: 5,
    marginRight: 10,
  },
  buttonContainer: {
    flexGrow: 0,
    alignSelf: 'flex-end',
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    paddingTop: 8,
  },
  buttonImage: {
    alignSelf: 'center',
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});

export default BleWiFiToggle;
