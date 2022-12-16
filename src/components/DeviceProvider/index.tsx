import * as React from 'react';
import {useDeviceState} from './hooks';
import {defaultContext, DeviceInfo} from './types';

export const DeviceInfoContext =
  React.createContext<DeviceInfo>(defaultContext);
export const useDeviceInfo = () => React.useContext(DeviceInfoContext);

export const DeviceProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const deviceInfo = useDeviceState();

  return (
    <DeviceInfoContext.Provider value={deviceInfo}>
      {children}
    </DeviceInfoContext.Provider>
  );
};
