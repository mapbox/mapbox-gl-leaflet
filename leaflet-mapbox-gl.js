function debounce (func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};

L.MapboxGL = L.Layer.extend({
    options: {
      updateInterval: 50
    },

    initialize: function (options) {
        L.setOptions(this, options);

        if (options.accessToken) {
            mapboxgl.accessToken = options.accessToken;
        } else {
            throw new Error('You should provide a Mapbox GL access token as a token option.');
        }

        // setup throttling the update event when panning
        this._throttledUpdate = debounce.call(this, this._update, this.options.updateInterval);
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
            move: this._throttledUpdate, // sensibly throttle updating while panning
            zoomanim: this._animateZoom, // ensure animation at the end of a zoom
            zoom: this._pinchZoom, // animate on the zoom event for smoother pinch-zooming
            zoomstart: this._zoomStart,
            zoomend: this._zoomEnd
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

        // treat child <canvas> element like L.ImageOverlay
        L.DomUtil.addClass(this._glMap._canvas.canvas, 'leaflet-image-layer');
        L.DomUtil.addClass(this._glMap._canvas.canvas, 'leaflet-zoom-animated');
    },

    _update: function (e) {
        if (this._zooming) {
          return;
        }

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

    // update the map constantly during a pinch zoom
    _pinchZoom: function (e) {
      this._glMap.jumpTo({
        zoom: this._map.getZoom() - 1,
        center: this._map.getCenter()
      });
    },

    // borrowed from L.ImageOverlay https://github.com/Leaflet/Leaflet/blob/master/src/layer/ImageOverlay.js#L139-L144
    _animateZoom: function (e) {
      var scale = this._map.getZoomScale(e.zoom),
          offset = this._map._latLngToNewLayerPoint(this._map.getBounds().getNorthWest(), e.zoom, e.center);

      L.DomUtil.setTransform(this._glMap._canvas.canvas, offset, scale);
    },

    _zoomStart: function () {
      this._zooming = true;
    },

    _zoomEnd: function () {
      var zoom = this._map.getZoom(),
          center = this._map.getCenter();

      // update the map on teh next available frame to avoid stuttering
      L.Util.requestAnimFrame(function () {
        // reset the scale
        L.DomUtil.setTransform(this._glMap._canvas.canvas, L.point(0,0), 1);

        // update the map position
        this._glMap.jumpTo({
          center: center,
          zoom: zoom - 1
        });
      }, this);

      // allow panning to work again
      this._zooming = false;
    }
});

L.mapboxGL = function (options) {
    return new L.MapboxGL(options);
};
