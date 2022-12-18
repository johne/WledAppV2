import React from 'react';
import {StackProps} from '../../WledStack';
import {WebView} from 'react-native-webview';
import {useDeviceComms} from './hooks';
import {View} from 'react-native';

const DeviceController: React.FC<StackProps> = ({navigation}) => {
  const {onMessage, injectedJs, sourceUri, webRef, loading} = useDeviceComms();

  if (loading) {
    return <View style={{backgroundColor: 'black', height: '100%'}} />;
  }

  console.log('using sourceUri', JSON.stringify({sourceUri}));

  return (
    <WebView
      style={{backgroundColor: 'clear'}}
      injectedJavaScript={injectedJs}
      source={{uri: `${sourceUri}index.htm`}}
      javaScriptEnabled={true}
      originWhitelist={['*']}
      allowFileAccess={true}
      allowingReadAccessToURL={sourceUri}
      onShouldStartLoadWithRequest={event => {
        console.log(JSON.stringify(event));
        return true;
      }}
      onMessage={onMessage}
      ref={webRef}
    />
  );
};

export default DeviceController;
