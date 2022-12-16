import React from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {StackProps} from '../../WledStack';

import {useDeviceList} from './hooks';
import DeviceListItem from './DeviceListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const DeviceList: React.FC<StackProps> = ({navigation, route}) => {
  const {deviceList, loading, refresh} = useDeviceList();

  console.log('here', {deviceList, loading});

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={deviceList}
        renderItem={({item}) => (
          <DeviceListItem navigation={navigation} item={item} route={route} />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        ListFooterComponent={() => <Text>pull down to refresh</Text>}
      />
    </View>
  );
};

export default DeviceList;
