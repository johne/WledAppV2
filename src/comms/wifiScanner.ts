import Zeroconf from 'react-native-zeroconf';
import Device from './Device';
import {WiFiDevice} from './WiFiDevice';
const zeroconf = new Zeroconf();

var timeout: NodeJS.Timeout;

export const scanForDevices = async (
  addDevice: (device: Device) => void,
): Promise<void> => {
  const deviceUrls: Array<string> = [];

  zeroconf.on('resolved', service => {
    const device = new WiFiDevice(service);

    if (!deviceUrls.includes(device.baseUrl)) {
      deviceUrls.push(device.baseUrl);

      device
        .get('http://127.0.0.1/json/si')
        .then(si => {
          addDevice(device);
          device.connect();
        })
        .catch(err => {
          console.log('must not be a wled', JSON.stringify({device, err}));
        });
    }
  });

  zeroconf.on('error', error => {
    console.log('error', {error});
  });

  zeroconf.scan('http', 'tcp', 'local.');

  clearTimeout(timeout);

  return new Promise(resolve => {
    timeout = setTimeout(() => {
      zeroconf.stop();
      resolve();
    }, 5000);
  });
};
