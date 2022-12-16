import {useEffect, useRef} from 'react';
import {Platform} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {useDeviceInfo} from '../../components/DeviceProvider';
import {injectedJs} from './injectedJs';

export const useDeviceComms = () => {
  const {device} = useDeviceInfo();

  const webRef = useRef<WebView>(null);

  useEffect(() => {
    const key = device.addListener((body: string) => {
      webRef.current?.injectJavaScript(
        `ws.onmessage({data: JSON.stringify(${body})});
        true;
        `,
      );
    });

    return () => {
      device.removeListener(key);
    };
  }, [device]);

  const sourceUri =
    (Platform.OS === 'android' ? 'file:///android_asset/' : '') +
    'Web.bundle/data/index.htm';

  const onMessage = async (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    console.log('got message: ' + event.nativeEvent.data, {data});

    const {url, options, key} = data;

    const {method, body, isWs} = options;

    const isPost = method.toLowerCase() === 'post';

    const result = isPost
      ? await device.post(url, body)
      : await device.get(url);

    console.log('result', result);

    const injectedResult = `wledApp2Result('${key}', ${result})`;

    console.log('injected result: ' + injectedResult);

    !isWs && webRef.current?.injectJavaScript(injectedResult);
  };

  return {webRef, sourceUri, injectedJs, onMessage};
};
