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
    console.log('base get not implemented');
    return '';
  }

  async post(command: string, body: string) {
    return '';
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
}

export default Device;
