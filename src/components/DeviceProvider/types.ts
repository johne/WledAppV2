import Device from '../../comms/Device';

export interface DeviceInfo {
  device: Device;
  setDevice: (device: Device) => void;
}

export const emptyDevice = (): Device => new Device('');

export const defaultContext: DeviceInfo = {
  device: emptyDevice(),
  setDevice: (device: Device) => undefined,
};
