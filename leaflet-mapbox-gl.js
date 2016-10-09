L.MapboxGL = L.Layer.extend({
    options: {
      updateInterval: 32
    },

    initialize: function (options) {
        L.setOptions(this, options);

        if (options.accessToken) {
            mapboxgl.accessToken = options.accessToken;
        } else {
            throw new Error('You should provide a Mapbox GL access token as a token option.');
        }
        
         /**
         * Create a version of `fn` that only fires once every `time` millseconds.
         *
         * @param {Function} fn the function to be throttled
         * @param {number} time millseconds required between function calls
         * @param {*} context the value of `this` with which the function is called
         * @returns {Function} debounced function
         * @private
         */
        var throttle = function (fn, time, context) {
            var lock, args, wrapperFn, later;
        
            later = function () {
                // reset lock and call if queued
                lock = false;
                if (args) {
                    wrapperFn.apply(context, args);
                    args = false;
                }
            };
        
            wrapperFn = function () {
                if (lock) {
                    // called too soon, queue to call later
                    args = arguments;
        
                } else {
                    // call and lock until later
                    fn.apply(context, arguments);
                    setTimeout(later, time);
                    lock = true;
                }
            };
        
            return wrapperFn;
        };

        // setup throttling the update event when panning
        this._throttledUpdate = throttle(L.Util.bind(this._update, this), this.options.updateInterval);
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
            zoomanim: this._animateZoom, // applys the zoom animation to the <canvas>
            zoom: this._pinchZoom, // animate every zoom event for smoother pinch-zooming
            zoomstart: this._zoomStart, // flag starting a zoom to disable panning
            zoomend: this._zoomEnd // reset the gl map view at the end of a zoom
        };
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
        // update the offset so we can correct for it later when we zoom
        this._offset = this._map.containerPointToLayerPoint([0, 0]);

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
            gl._update();
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

      L.DomUtil.setTransform(this._glMap._canvas.canvas, offset.subtract(this._offset || L.point(0,0)), scale);
    },

    _zoomStart: function () {
      this._zooming = true;
    },

    _zoomEnd: function () {
      var zoom = this._map.getZoom(),
          center = this._map.getCenter(),
          offset = this._map.latLngToContainerPoint(this._map.getBounds().getNorthWest());

      // update the map on the next available frame to avoid stuttering
      L.Util.requestAnimFrame(function () {
        // reset the scale and offset
        L.DomUtil.setTransform(this._glMap._canvas.canvas, offset, 1);

        // enable panning once the gl map is ready again
        this._glMap.once('moveend', L.Util.bind(function () {
          this._zooming = false;
        }, this));

        // update the map position
        this._glMap.jumpTo({
          center: center,
          zoom: zoom - 1
        });
      }, this);
    }
});

L.mapboxGL = function (options) {
    return new L.MapboxGL(options);
};
