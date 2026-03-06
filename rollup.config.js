import resolve from '@rollup/plugin-node-resolve';

const banner = `/*!
 * mapbox-gl-leaflet
 * Mapbox GL JS layer for Leaflet
 * https://github.com/mapbox/mapbox-gl-leaflet
 * Licensed under ISC
 */`;

export default [
    // ESM build
    {
        input: 'src/leaflet-mapbox-gl.js',
        output: {
            file: 'dist/leaflet-mapbox-gl.esm.js',
            format: 'esm',
            banner,
            sourcemap: true
        },
        external: ['leaflet', 'mapbox-gl'],
        plugins: [resolve()]
    },
    // UMD build (for browsers and CommonJS)
    {
        input: 'src/leaflet-mapbox-gl.js',
        output: {
            file: 'dist/leaflet-mapbox-gl.js',
            format: 'umd',
            name: 'L.mapboxGL',
            banner,
            sourcemap: true,
            globals: {
                'leaflet': 'L',
                'mapbox-gl': 'mapboxgl'
            },
            // Extend L rather than overwriting
            extend: true,
            exports: 'named'
        },
        external: ['leaflet', 'mapbox-gl'],
        plugins: [resolve()]
    }
];
