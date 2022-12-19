import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {StackProps} from '../../WledStack';

import {useDeviceInfo} from '../../components/DeviceProvider';
import Device from '../../comms/Device';
import {useRerender} from './hooks';
import BleWiFiToggle from './BleWiFiToggle';

interface DeviceListItemProps extends StackProps {
  item: Device;
  change: number;
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({item, navigation}) => {
  const {setDevice} = useDeviceInfo();

  const {width} = useWindowDimensions();

  const onPress = () => {
    setDevice(item);
    navigation.navigate('Device');
  };

  return (
    <View
      style={{
        width,
        maxWidth: width,
        backgroundColor: 'black',
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomColor: '#333333',
        borderBottomWidth: 2,
      }}>
      <View
        style={{
          width,
          maxWidth: width,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 5,
          paddingBottom: 5,
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            padding: 10,
            backgroundColor: 'black',
            flexGrow: 1,
          }}>
          <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
            {item.name}
          </Text>
        </TouchableOpacity>
        <BleWiFiToggle item={item} />
        <TouchableOpacity
          onPress={() => item.togglePower()}
          style={{
            flexGrow: 0,
            alignSelf: 'flex-end',
            borderColor: 'white',
            borderWidth: 3,
            width: 52,
            height: 52,
            borderRadius: 52 / 2,
            margin: 5,
            backgroundColor: item.isOn() ? '#707070' : 'black',
          }}>
          <Image
            source={require('../../images/icon_power.png')}
            style={{
              alignSelf: 'center',
              marginTop: 3,
              height: 40,
              width: 40,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <Slider
        style={{width: '100%', height: 20}}
        minimumValue={0}
        maximumValue={255}
        minimumTrackTintColor="blue"
        maximumTrackTintColor="#333333"
        value={item.bright()}
        onSlidingComplete={(value: number) => item.adjustBright(value)}
        step={1}
      />
    </View>
  );
};

export default DeviceListItem;
