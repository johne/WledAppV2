export interface StateInfo {
  info: {
    ver: string;
    ble?: {support: boolean};
    ws: number;
  };
  state: {
    on: boolean;
    bri: number;
  };
}
