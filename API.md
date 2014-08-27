## `L.mapboxGl(options)`

Create a new Mapbox GL layer in a Leaflet-compatible wrapper.

<span class='leaflet icon'>_Extends_: `L.Class`</span>

`options` is an object of options. All options given are passed to a Mapbox GL `Map` object,
so consult [the Mapbox GL .Map documentation](https://www.mapbox.com/mapbox-gl-js/api/#new-mapboxgl-map-options-)
for the full range.

| Option | Value | Description |
| ---- | ---- | ---- |
| accessToken | string | **Required**: a [Mapbox access token](https://www.mapbox.com/help/define-access-token/) to identify requests for map resources |

### `layer.addTo(map)`

Same behavior as `.addTo` on any Leaflet layer: this adds the layer to a given
map or group.
