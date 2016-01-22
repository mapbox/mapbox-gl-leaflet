L.MapboxGL = L.Layer.extend({

    initialize: function (options) {
        L.setOptions(this, options);

        if (options.accessToken) {
            mapboxgl.accessToken = options.accessToken;
        } else {
            throw new Error('You should provide a Mapbox GL access token as a token option.');
        }
    },

    onAdd: function (map) {
        this._map = map;

        if (!this._glContainer) {
            this._initContainer();
        }

        map._panes.tilePane.appendChild(this._glContainer);

        this._initGL();
    },

    onRemove: function (map) {
        map.getPanes().tilePane.removeChild(this._glContainer);
        this._glMap.remove();
        this._glMap = null;
    },

    getEvents: function () {
        return {
            move: this._update,
            zoomanim: this._animateZoom
        }
    },

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    _initContainer: function () {
        var container = this._glContainer = L.DomUtil.create('div', 'leaflet-gl-layer');

        var size = this._map.getSize();
        container.style.width  = size.x + 'px';
        container.style.height = size.y + 'px';
    },

    _initGL: function () {
        var center = this._map.getCenter();

        var options = L.extend({}, this.options, {
            container: this._glContainer,
            interactive: false,
            center: [center.lng, center.lat],
            zoom: this._map.getZoom() - 1,
            attributionControl: false
        });

        this._glMap = new mapboxgl.Map(options);
        // allow GL base map to pan beyond min/max latitudes
        this._glMap.transform.latRange = null;
    },

    _update: function () {
        var size = this._map.getSize(),
            container = this._glContainer,
            gl = this._glMap,
            topLeft = this._map.containerPointToLayerPoint([0, 0]);

        L.DomUtil.setPosition(container, topLeft);

        var center = this._map.getCenter();

        // gl.setView([center.lat, center.lng], this._map.getZoom() - 1, 0);
        // calling setView directly causes sync issues because it uses requestAnimFrame

        var tr = gl.transform;
        tr.center = mapboxgl.LngLat.convert([center.lng, center.lat]);
        tr.zoom = this._map.getZoom() - 1;

        if (gl.transform.width !== size.x || gl.transform.height !== size.y) {
            container.style.width  = size.x + 'px';
            container.style.height = size.y + 'px';
            gl.resize();
        } else {
            gl.update();
        }
    },

    _animateZoom: function (e) {
        // borrowed from the Leaflet 0.7.7 origin calcuation
        // https://github.com/Leaflet/Leaflet/blob/v0.7.7/src/map/anim/Map.ZoomAnimation.js#L47-L50
        var scale = this._map.getZoomScale(e.zoom),
            offset = this._map._getCenterOffset(e.center)._divideBy(1 - 1 / scale),
            origin = this._map._getCenterLayerPoint()._add(offset),
            zoomOffset = origin.add(this._map._getMapPanePos()).subtract(this._map.getSize().divideBy(2));

        this._glMap.zoomTo(e.zoom - 1, {
            duration: 250,
            offset: [zoomOffset.x, zoomOffset.y],
            easing: [0, 0, 0.25, 1]
        });
    }
});

L.mapboxGL = function (options) {
    return new L.MapboxGL(options);
};
