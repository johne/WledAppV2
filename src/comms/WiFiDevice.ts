import {Service} from 'react-native-zeroconf';
import Device from './Device';

export class WiFiDevice extends Device {
  baseUrl: string;
  _wsSupport: boolean = false;
  _webSocket: WebSocket | null = null;

  constructor(service: Service) {
    super(service.name);
    const host = service.host.endsWith('.')
      ? service.host.slice(0, -1)
      : service.host;

    this.baseUrl = `http://${host}:${service.port}`;
  }

  async connect() {
    if (this._wsSupport) {
      this._webSocket = new WebSocket(
        this.baseUrl.replace('http:', 'ws:') + '/ws',
      );

      this._webSocket.onmessage = (event: WebSocketMessageEvent) => {
        super.notify(event.data);
      };
    }
    // TODO Connect websocket? then websocket calls listeners
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
      .then(res => JSON.stringify(res));
  }
}
