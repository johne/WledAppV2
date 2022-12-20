import BleManager from 'react-native-ble-manager';
import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

export class BleManagerModule {
  subscriptions: Record<string, EmitterSubscription> = {};
  emitter: NativeEventEmitter;

  constructor() {
    const BleManagerModule = NativeModules.BleManager;
    this.emitter = new NativeEventEmitter(BleManagerModule);
  }

  removeAllSubscription() {
    Object.values(this.subscriptions).forEach(sub => sub.remove());
    this.subscriptions = {};
  }

  addListener(
    eventType: string,
    listener: (event: any) => void,
    context?: Object,
  ): EmitterSubscription {
    const sub = this.emitter.addListener(eventType, listener);

    this.subscriptions[eventType] = sub;
    return sub;
  }

  removeListener(eventType: string): void {
    const sub = this.subscriptions[eventType];

    if (sub) {
      this.emitter.removeSubscription(sub);
      delete this.subscriptions[eventType];
    }
  }
}
