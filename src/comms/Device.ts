import {StateInfo} from './types';

export type deviceListener = (body: string) => void;

class Device {
  name: string;
  listeners: Record<string, deviceListener> = {};

  constructor(name: string) {
    this.name = name;
  }

  async connect() {
    // not implemented
  }

  async get(command: string) {
    return '';
  }

  async post(command: string, body: string) {
    return '';
  }

  postState(body: string) {
    this.post(`http://127.0.0.1/json/state`, body);
  }

  togglePower() {
    const json = {on: !this.isOn()};
    this.postState(JSON.stringify(json));
  }

  adjustBright(value: number) {
    const json = {bri: Math.floor(value)};
    this.postState(JSON.stringify(json));
  }

  bright() {
    return 255;
  }

  notify(body: string) {
    Object.values(this.listeners).forEach(listener => listener(body));
  }

  addListener(listener: deviceListener): string {
    const key = `${Math.random()}`;
    this.listeners[key] = listener;
    return key;
  }

  removeListener(id: string) {
    delete this.listeners[id];
  }

  getVersion(): string {
    return '';
  }

  hasBle(): boolean {
    return false;
  }

  isOn(): boolean {
    return false;
  }

  getStateInfo(): StateInfo | undefined {
    return undefined;
  }

  getType(): string {
    return '';
  }

  toggleBle(): void {
    this.postState(JSON.stringify({bleToggle: true}));
  }

  isConnected(): boolean {
    return false;
  }
}

export default Device;
