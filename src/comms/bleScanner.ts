import Device from './Device';
import BleManager from 'react-native-ble-manager';
import {BleManagerModule} from './BleManagerModule';
import {BleDevice} from './BleDevice';

export const bleManagerEmitter = new BleManagerModule();

export const scanForDevices = async (
  addDevice: (device: Device) => void,
): Promise<void> => {
  const devicesFound: Array<string> = [];
  bleManagerEmitter.removeAllSubscription();

  bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', peripheral => {
    if (
      peripheral.name === 'WLED BLE2JSON' &&
      !devicesFound.includes(peripheral.id)
    ) {
      devicesFound.push(peripheral.id);
      const device = new BleDevice(peripheral);
      addDevice(device);
      device.connect();
    }
  });

  bleManagerEmitter.addListener('BleManagerStopScan', () => {
    console.log('BleManagerStopScan');
  });

  bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', () => {
    console.log('BleManagerDisconnectPeripheral');
  });

  console.log('trying to scan');

  await BleManager.scan([], 10, true)
    .then(() => {
      console.log('Scanning...');
    })
    .catch(err => {
      console.error(err);
    });

  return;
};
