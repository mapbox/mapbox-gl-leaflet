## `L.mapboxGL(options)`

Create a new Mapbox GL layer in a Leaflet-compatible wrapper.

<span class='leaflet icon'>_Extends_: `L.Class`</span>

`options` is an object of options. All options given are passed to a Mapbox GL `Map` object,
so consult [the Mapbox GL .Map documentation](https://www.mapbox.com/mapbox-gl-js/api/#new-mapboxgl-map-options-)
for the full range.

| Option | Value | Description |
| ---- | ---- | ---- |
| accessToken | string | **Required**: a [Mapbox access token](https://www.mapbox.com/help/define-access-token/) to identify requests for map resources |
| padding | number | [0.15] | Relative padding of the mapbox-gl layer to avoid the background flickering around the edges of the map |
| interactive | boolean | [false] | Wheter or not to register the mouse and keyboard events on the mapbox-gl layer. Turn this on if you intend to use the mapbox-gl layer events. |

### `layer.addTo(map)`

Same behavior as `.addTo` on any Leaflet layer: this adds the layer to a given
map or group.
