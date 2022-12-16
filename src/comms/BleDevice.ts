import {Service} from 'react-native-zeroconf';
import Device from './Device';

export class BleDevice extends Device {
  baseUrl: string;

  constructor(service: Service) {
    super(service.name);
    const host = service.host.endsWith('.')
      ? service.host.slice(0, -1)
      : service.host;

    this.baseUrl = `http://${host}:${service.port}`;
  }

  async get(command: string) {
    return '';
  }

  async post(command: string, body: string) {
    return '';
  }
}
