import * as L from 'leaflet';
import * as mapboxgl from 'mapbox-gl';

declare module 'leaflet' {
    interface MapboxGLOptions extends L.LayerOptions {
        /** Mapbox access token */
        accessToken?: string;
        /** Mapbox style URL or style object */
        style?: string | mapboxgl.StyleSpecification;
        /** Update interval in milliseconds (default: 32) */
        updateInterval?: number;
        /** Padding around the map view (default: 0.1) */
        padding?: number;
        /** Enable mouse/keyboard events on the mapbox overlay (default: false) */
        interactive?: boolean;
        /** Custom class name for the canvas element */
        className?: string;
        /** Minimum zoom level */
        minZoom?: number;
        /** Maximum zoom level */
        maxZoom?: number;
    }

    class MapboxGL extends L.Layer {
        constructor(options: MapboxGLOptions);
        options: MapboxGLOptions;

        /** Get the underlying Mapbox GL map instance */
        getMapboxMap(): mapboxgl.Map;

        /** Get the canvas element */
        getCanvas(): HTMLCanvasElement;

        /** Get the size of the layer */
        getSize(): L.Point;

        /** Get the bounds of the layer */
        getBounds(): L.LatLngBounds;

        /** Get the container element */
        getContainer(): HTMLDivElement;

        /** Get the pane name */
        getPaneName(): string;
    }

    function mapboxGL(options: MapboxGLOptions): MapboxGL;
}

export interface MapboxGLOptions extends L.LayerOptions {
    /** Mapbox access token */
    accessToken?: string;
    /** Mapbox style URL or style object */
    style?: string | mapboxgl.StyleSpecification;
    /** Update interval in milliseconds (default: 32) */
    updateInterval?: number;
    /** Padding around the map view (default: 0.1) */
    padding?: number;
    /** Enable mouse/keyboard events on the mapbox overlay (default: false) */
    interactive?: boolean;
    /** Custom class name for the canvas element */
    className?: string;
    /** Minimum zoom level */
    minZoom?: number;
    /** Maximum zoom level */
    maxZoom?: number;
}

export class MapboxGL extends L.Layer {
    constructor(options: MapboxGLOptions);
    options: MapboxGLOptions;

    /** Get the underlying Mapbox GL map instance */
    getMapboxMap(): mapboxgl.Map;

    /** Get the canvas element */
    getCanvas(): HTMLCanvasElement;

    /** Get the size of the layer */
    getSize(): L.Point;

    /** Get the bounds of the layer */
    getBounds(): L.LatLngBounds;

    /** Get the container element */
    getContainer(): HTMLDivElement;

    /** Get the pane name */
    getPaneName(): string;
}

export function mapboxGL(options: MapboxGLOptions): MapboxGL;

export default mapboxGL;
