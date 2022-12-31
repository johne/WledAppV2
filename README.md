# WledAppV2

[WLED](https://kno.wled.ge/) app built on [react-native](https://reactnative.dev/) that supports bluetooth low energy (ble) connection in additions to wifi connection.

## wled device setup

to use ble mode, your wled device must have the [Ble2Json](https://github.com/johne/WLED/tree/ble/usermods/Ble2Json_v2) usermod enabled. instructions for setting up that usermod can be found at the github link above.

## screenshots

### main wled instance list

<a href="https://user-images.githubusercontent.com/61222/210085892-f4828ac3-5930-45e1-bf92-0c6d78b03ce1.PNG"><img src="https://user-images.githubusercontent.com/61222/210085892-f4828ac3-5930-45e1-bf92-0c6d78b03ce1.PNG" width="150"/></a>

### color control tab

<a href="https://user-images.githubusercontent.com/61222/210085888-52c28dd5-6e52-4ef0-8a72-bbc24ca51f71.PNG"><img src="https://user-images.githubusercontent.com/61222/210085888-52c28dd5-6e52-4ef0-8a72-bbc24ca51f71.PNG" width="150"/></a>

### effects

<a href="https://user-images.githubusercontent.com/61222/210085882-587fb73f-fe73-4c73-9c6e-b7f1299656ad.PNG"><img src="https://user-images.githubusercontent.com/61222/210085882-587fb73f-fe73-4c73-9c6e-b7f1299656ad.PNG" width="150"/></a>

### presets and playlists

<a href="https://user-images.githubusercontent.com/61222/210085887-eebd2e5d-1765-4887-bf12-a2177effc292.PNG"><img src="https://user-images.githubusercontent.com/61222/210085887-eebd2e5d-1765-4887-bf12-a2177effc292.PNG" width="150"/></a>

### segments

<a href="https://user-images.githubusercontent.com/61222/210085884-0e0e440d-af12-4e27-bf0f-788158a6d145.PNG"><img src="https://user-images.githubusercontent.com/61222/210085884-0e0e440d-af12-4e27-bf0f-788158a6d145.PNG" width="150"/></a>

## TODO

- put back in config tab on wifi mode
- support palette details
- figure out why switching wifi and ble doesn't work great
- handle exceptions
  - device disconnect
- figure out bundling
- test ble in airplane mode
- test "info" after fixing `{"v":true}` call
