import {Service} from 'react-native-zeroconf';
import Device from './Device';
import {StateInfo} from './types';

export class WiFiDevice extends Device {
  baseUrl: string;
  _webSocket: WebSocket | null = null;
  si?: StateInfo = undefined;

  constructor(service: Service) {
    super(service.name);
    const host = service.host.endsWith('.')
      ? service.host.slice(0, -1)
      : service.host;

    this.baseUrl = `http://${host}:${service.port}`;
  }

  async connect() {
    if (this.si?.info?.ws !== -1) {
      this._webSocket = new WebSocket(
        this.baseUrl.replace('http:', 'ws:') + '/ws',
      );

      this._webSocket.onmessage = (event: WebSocketMessageEvent) => {
        if (this.si) this.si.state = JSON.parse(event.data).state;
        super.notify(event.data);
      };
    }
  }

  async get(command: string) {
    const path = command.split('/').slice(3).join('/');

    return fetch(`${this.baseUrl}/${path}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (path === 'json/si') {
          this.si = res;
        }
        return res;
      })
      .then(res => JSON.stringify(res));
  }

  async post(command: string, body: string) {
    const path = command.split('/').slice(3).join('/');

    return fetch(`${this.baseUrl}/${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })
      .then(res => res.json())
      .then(res => {
        if (path == 'json/state' && this.si) this.si.state = res;
        return res;
      })
      .then(res => JSON.stringify(res));
  }

  getVersion(): string {
    return this.si?.info?.ver || 'unknown';
  }

  hasBle(): boolean {
    return !!this.si?.info?.ble?.support;
  }

  isOn(): boolean {
    return !!this.si?.state?.on;
  }

  bright(): number {
    return this.si?.state?.bri || 0;
  }

  getStateInfo(): StateInfo | undefined {
    return this.si;
  }

  getType(): string {
    return 'wifi';
  }
}
