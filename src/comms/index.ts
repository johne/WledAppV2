import {scanForDevices as bleScan} from './bleScanner';
import Device from './Device';
import {scanForDevices as wifiScan} from './wifiScanner';

export const scanForDevices = async (
  addDevice: (device: Device) => void,
): Promise<void> => {
  const bleProm = bleScan(addDevice);
  const wifiProm = wifiScan(addDevice);

  await Promise.all([bleProm, wifiProm]);
};
