import Device from './Device';
import BleManager from 'react-native-ble-manager';
import {bleManagerEmitter} from './bleScanner';
import {StateInfo} from './types';
import * as bleConsts from './bleConst';

interface Request {
  messageBuffer: string;
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason?: any) => void;
  page: number;
  param: string;
  endpoint: bleConsts.Endpoint;
}

export class BleDevice extends Device {
  id: string = '';
  outstandingRequestMap: Record<string, Request> = {};
  connected: boolean = false;
  si?: StateInfo = undefined;
  notifyBuffer = '';

  constructor(peripheral: any) {
    super(peripheral.advertising.localName);
    this.id = peripheral.id;
  }

  convertString(value: string): Array<number> {
    const charCodeArr = [];

    for (let i = 0; i < value.length; i++) {
      let code = value.charCodeAt(i);
      charCodeArr.push(code);
    }

    return charCodeArr;
  }

  async startDataNotifications() {
    for (const key in bleConsts.pathMapping) {
      const info = bleConsts.pathMapping[key];
      await BleManager.startNotification(this.id, info.service, info.data);
    }
  }

  mapRequestResponse(response: string, charId: string): string {
    switch (charId) {
      case bleConsts.WLED_BLE_FX_DETAILS_DATA_ID:
      case bleConsts.WLED_BLE_FX_NAMES_DATA_ID:
      case bleConsts.WLED_BLE_PALETTE_NAME_DATA_ID:
        return JSON.stringify(JSON.parse(response).array);
      default:
        return response;
    }
  }

  async connect(): Promise<void> {
    console.log('connecting');
    await BleManager.connect(this.id);
    bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      (data: any) => {
        if (data.characteristic === bleConsts.WLED_BLE_PRESETS_DATA_ID) {
          console.log('got preset data: ' + data.value.length);
        }

        if (data.peripheral === this.id) {
          if (data.characteristic === bleConsts.WLED_BLE_STATE_INFO_NOTIFY_ID) {
            this.notifyBuffer += String.fromCharCode.apply(null, data.value);

            if (data.value.length !== bleConsts.CHUNK_LENGTH) {
              if (this.si) this.si.state = JSON.parse(this.notifyBuffer);
              this.notify(this.notifyBuffer);
              this.notifyBuffer = '';
            }
            return;
          }

          const request = this.outstandingRequestMap[data.characteristic];

          if (request) {
            request.messageBuffer += String.fromCharCode.apply(
              null,
              data.value,
            );
            if (data.value.length !== bleConsts.CHUNK_LENGTH) {
              request.resolve(
                this.mapRequestResponse(
                  request.messageBuffer,
                  data.characteristic,
                ),
              );
              request.messageBuffer = '';
            } else {
              request.page++;
              BleManager.write(
                this.id,
                request.endpoint.service,
                request.endpoint.control,
                this.convertString('r' + request.param + ':' + request.page),
              );
            }
          }
        }
      },
    );
    console.log('connect 1');
    await BleManager.retrieveServices(this.id);
    console.log('connect 2');

    await this.startDataNotifications();

    console.log('connect 3');
    await BleManager.startNotification(
      this.id,
      bleConsts.WLED_BLE_DATA_SERVICE_ID,
      bleConsts.WLED_BLE_STATE_INFO_NOTIFY_ID,
    );
    console.log('connect 4');

    this.si = JSON.parse(await this.get('http://localhost/json/si'));
    this.connected = true;
    this.notify('{}');
  }

  startRead(
    endpoint: {service: string; data: string; control: string},
    param: string,
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      console.log('starting read', endpoint);
      BleManager.write(
        this.id,
        endpoint.service,
        endpoint.control,
        this.convertString('r' + param + ':1'),
      );
      this.outstandingRequestMap[endpoint.data] = {
        messageBuffer: '',
        resolve,
        reject,
        page: 1,
        param,
        endpoint,
      };
    });
  }

  async get(command: string): Promise<string> {
    const url = new URL(command);

    const path = url.pathname;

    console.log('reading ' + path);

    const endpoint = bleConsts.pathMapping[path];

    const page = url.searchParams.get('page') || '';

    if (endpoint) {
      return this.startRead(endpoint, page);
    }

    console.log('unknown path request', {path});

    return '{}';
  }

  async chunckWrite(data: number[]): Promise<void> {
    if (data.length % bleConsts.CHUNK_LENGTH === 0) {
      data.push(32); // append a space
    }

    let remaining = data.length;
    let pos = 0;

    do {
      const toWrite = Math.min(remaining, bleConsts.CHUNK_LENGTH);

      console.log('posting chunk', {pos, toWrite, len: data.length, remaining});

      await BleManager.write(
        this.id,
        bleConsts.WLED_BLE_DATA_SERVICE_ID,
        bleConsts.WLED_BLE_STATE_INFO_DATA_ID,
        data.slice(pos, pos + toWrite),
        bleConsts.CHUNK_LENGTH,
      );

      pos += toWrite;
      remaining -= toWrite;

      console.log('posted chunk', {
        next: pos,
        wrote: toWrite,
        len: data.length,
        nextRemaining: remaining,
      });
    } while (remaining > 0);
  }

  async post(command: string, body: string) {
    const path = command.split('/').slice(3).join('/');

    console.log('post', {command, body});

    if (path === 'json/state' || path === 'json/si') {
      console.log('posting', body);
      await this.chunckWrite(this.convertString(body));
    }

    return JSON.stringify({success: true});
  }

  getVersion(): string {
    return this.si?.info?.ver || 'unknown';
  }

  hasBle(): boolean {
    return true;
  }

  isOn(): boolean {
    return !!this.si?.state?.on;
  }

  bright(): number {
    return this.si?.state?.bri || 0;
  }

  getType(): string {
    return 'ble';
  }

  isConnected(): boolean {
    return this.connected;
  }
}
