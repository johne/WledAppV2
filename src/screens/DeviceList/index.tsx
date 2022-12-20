import React from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {StackProps} from '../../WledStack';

import {useDeviceList} from './hooks';
import DeviceListItem from './DeviceListItem';

const DeviceList: React.FC<StackProps> = ({navigation, route}) => {
  const {deviceList, loading, refresh, change} = useDeviceList();

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: Dimensions.get('window').width,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Progress.CircleSnail color={['red', 'green', 'blue']} duration={700} />
      </View>
      <FlatList
        style={{
          backgroundColor: 'transparent',
        }}
        numColumns={1}
        data={deviceList}
        renderItem={({item}) => (
          <DeviceListItem
            navigation={navigation}
            item={item}
            change={change}
            route={route}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            tintColor="transparent"
            colors={['transparent']}
            style={{backgroundColor: 'transparent'}}
          />
        }
        ListFooterComponent={() => (
          <Text
            style={{
              color: '#fff',
              backgroundColor: '#000',
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
              paddingTop: 30,
            }}>
            pull down to scan for devices
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default DeviceList;
