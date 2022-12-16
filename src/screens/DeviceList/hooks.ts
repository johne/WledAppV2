import {useEffect, useState} from 'react';
import {scanForDevices} from '../../comms';
import Device from '../../comms/Device';

export const useDeviceList = () => {
  const [deviceList, setDeviceList] = useState<Array<Device>>([]);
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    setLoading(true);
    setDeviceList([]);
    scanForDevices((device: Device) =>
      setDeviceList(state => [...state, device]),
    ).then(() => setLoading(false));
  };

  useEffect(() => {
    if (!loading) {
      refresh();
    }
  }, []);

  return {deviceList, loading, refresh};
};
