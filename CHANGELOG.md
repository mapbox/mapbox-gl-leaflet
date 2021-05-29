# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [0.0.15] - 2021-05-29

### Fixed
- remember GL map when removed and readded to avoid creating a new SKU token - #138 :pray: @vcoppe :pray:

## [0.0.14] - 2020-11-24

### Fixed

- fix gl offset issue in low zoom level

## [0.0.13] - 2020-08-31

### Added
-  `.getPaneName()` method

### Fixed
- Allow gl tiles to be added to a custom pane defined in options

## [0.0.12] - 2020-03-27

### Fixed

- `accessToken` is now optional

## [0.0.11] - 2019-11-04

### Fixed

- ensure gl map is added to leaflet TilePane

## [0.0.10] - 2019-09-16

## Added

- `.getContainer()`, `.getSize()`, `getBounds()` and `getCanvas()` methods.

## Fixed

- internal code changes to bring it closer to other overlay layers.

## [0.0.9] - 2019-09-02

## Added

- Added `interactive` option to make `mapbox-gl` map events handling possible.
- added public accessor to `mapbox-gl` map object

## [0.0.8] - 2019-08-07

## Added

- Added a `padding` option to fix the grey backgrougd flickering around the edges of the map while panning/zooming
- bumped the libraries in examples

## [0.0.7] - 2019-07-01

### Fixed

- Ensure no blank/gray area is displayed when zooming out.

## [0.0.6] - 2019-05-07

### Fixed

- `.git` directory removed from npm tarball.

## [0.0.5] - 2019-05-01

### Added

- `leaflet` and `mapbox-gl-js` are now declared as peerDependencies.

## [0.0.4] - 2019-02-27

### Added

- UMD wrapper
- support for `pane` in constructor

### Fixed

- webkitTransitionEnd event crash

## [0.0.3] - 2017-04-18

### Added

- Improved support for older versions of `mapbox-gl-js`

## [0.0.2] - 2017-03-08

### Added

- Introduced support for Leaflet `v1.0.x`

## 0.7. - 2016-10-09

- Compatibility release for Leaflet `v0.7.x`

[Unreleased]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.15...HEAD
[0.0.15]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.14...v0.0.15
[0.0.14]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/mapbox/mapbox-gl-leaflet/compare/v0.7...v0.0.2
