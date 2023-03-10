import {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {useDeviceInfo} from '../../components/DeviceProvider';
import HtmlManager from '../../HtmlManager';
import {injectedJs} from './injectedJs';

const receiveWs = (webRef: React.RefObject<WebView>, body: string): void => {
  webRef.current?.injectJavaScript(
    `
    ws && ws.onmessage && ws.onmessage({data: JSON.stringify(${body})});
    true;
    `,
  );
};

export const useDeviceComms = () => {
  const bundleSource =
    (Platform.OS === 'android' ? 'file:///android_asset/' : '') +
    'Web.bundle/data/';

  const {device} = useDeviceInfo();
  const [sourceUri, setSourceUri] = useState(bundleSource);
  const [loadingSource, setLoadingSource] = useState(true);

  const webRef = useRef<WebView>(null);

  useEffect(() => {
    HtmlManager.getRelease(device.getVersion())
      .then(res => {
        if (res) {
          setSourceUri(`${res}/`);
        }

        setLoadingSource(false);
      })
      .catch(err => {
        console.log('got err loading src', err);
        setLoadingSource(false);
      });

    const key = device.addListener((body: string) => {
      receiveWs(webRef, body);
    });

    return () => {
      device.removeListener(key);
    };
  }, [device]);

  const onMessage = async (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    const {url, options, key} = data;

    const {method, body, isWs} = options;

    const isPost = method.toLowerCase() === 'post';

    const result = isPost
      ? await device.post(url, body)
      : await device.get(url);

    if (isWs) {
      receiveWs(webRef, result);
    } else {
      const injectedResult = `wledApp2Result('${key}', ${result}, true)`;

      webRef.current?.injectJavaScript(injectedResult);
    }
  };

  return {
    webRef,
    sourceUri,
    injectedJs,
    onMessage,
    loading: loadingSource,
  };
};
