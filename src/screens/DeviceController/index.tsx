import React from 'react';
import {Platform} from 'react-native';
import {StackProps} from '../../WledStack';
import {WebView} from 'react-native-webview';
import {useDeviceComms} from './hooks';

const DeviceController: React.FC<StackProps> = ({navigation}) => {
  const {onMessage, injectedJs, sourceUri, webRef} = useDeviceComms();

  return (
    <WebView
      injectedJavaScript={injectedJs}
      source={{uri: sourceUri}}
      javaScriptEnabled={true}
      originWhitelist={['*']}
      allowFileAccess={true}
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
