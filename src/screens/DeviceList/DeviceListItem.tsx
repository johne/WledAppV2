import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {StackProps} from '../../WledStack';

import {useDeviceInfo} from '../../components/DeviceProvider';
import {Device} from '../../components/DeviceProvider/types';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

interface DeviceListItemProps extends StackProps {
  item: Device;
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({item, navigation}) => {
  const {setDevice} = useDeviceInfo();

  const onPress = () => {
    setDevice(item);
    navigation.navigate('Device');
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default DeviceListItem;
