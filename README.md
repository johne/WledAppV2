# WledAppV2

[WLED](https://kno.wled.ge/) app built on [react-native](https://reactnative.dev/) that supports bluetooth low energy (ble) connection in additions to wifi connection.

## wled device setup

to use ble mode, your wled device must have the [Ble2Json](https://github.com/johne/WLED/tree/ble/usermods/Ble2Json_v2) usermod enabled. instructions for setting up that usermod can be found at the github link above.

## TODO

- put back in config tab on wifi mode
- support palette details
- figure out why switching wifi and ble doesn't work great
- handle exceptions
  - device disconnect
- figure out bundling
- test ble in airplane mode
- test "info" after fixing `{"v":true}` call
