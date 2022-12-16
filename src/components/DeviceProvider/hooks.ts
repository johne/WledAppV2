import {useState} from 'react';
import Device from '../../comms/Device';
import {emptyDevice} from './types';

export const useDeviceState = () => {
  const [device, setDevice] = useState<Device>(emptyDevice());

  return {device, setDevice};
};
