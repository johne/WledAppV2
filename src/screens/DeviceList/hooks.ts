import {useEffect, useState} from 'react';
import {scanForDevices} from '../../comms';
import Device from '../../comms/Device';

export const useDeviceList = () => {
  const [deviceList, setDeviceList] = useState<Array<Device>>([]);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(0);

  const refresh = () => {
    setLoading(true);
    setDeviceList([]);
    scanForDevices((device: Device) =>
      setDeviceList(state => [...state, device]),
    ).then(() => setLoading(false));
  };

  useEffect(() => {
    const devices = deviceList.map(device => ({
      device,
      key: device.addListener(() => {
        console.log('changed');
        setChange(change => change + 1);
      }),
    }));

    return () => {
      devices.forEach(item => item.device.removeListener(item.key));
    };
  }, [deviceList]);

  useEffect(() => {
    if (!loading) {
      refresh();
    }
  }, []);

  return {deviceList, loading, refresh, change};
};

export const useRerender = () => {
  const [value, setValue] = useState(0);

  return {rerender: () => setValue(value => value++), value};
};
