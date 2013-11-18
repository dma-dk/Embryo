function RouteLayer() {
    this.init = function() {
        var colors = {
           "active" : "#FF0000",
           "planned" : "#D5672D",
           "other" : "#3E7D1D"
               // Another green : "#2AAC0C"
               // orig green 2a6237
        };
        var that = this;

        this.layers = [];
        // Create vector layer for routes

        // Find a better color code. How to convert sRGB to HTML codes?
        var yourDefault = OpenLayers.Util.applyDefaults({
            strokeWidth : 2,
            strokeDashstyle : 'dashdot',
            strokeColor : "${getColor}",
            strokeOpacity : "${getOpacity}",
        }, OpenLayers.Feature.Vector.style["default"]);

        var context = {
            getOpacity : function() {
                return that.active ? 1 : 0.3;
            },
            getColor : function(feature){
                return colors[feature.data.colorKey];
            }
        };

        var select = OpenLayers.Util.applyDefaults({}, OpenLayers.Feature.Vector.style.select);
        var selectStyle = new OpenLayers.Style(select);

        var temporary = OpenLayers.Util.applyDefaults({}, OpenLayers.Feature.Vector.style.temporary);
        var temporaryStyle = new OpenLayers.Style(temporary);

        this.layers.route = new OpenLayers.Layer.Vector("routeLayer", {
            styleMap : new OpenLayers.StyleMap({
                'default' : new OpenLayers.Style(yourDefault, {
                    context : context
                }),
                'select' : selectStyle,
                'temporary' : temporaryStyle
            })
        });
    }

    function createVectorFeatures(route, colorKey) {
        var features = [];

        if (route && route.wps) {
            var firstPoint = true;
            var currentPoint;
            var previousPoint = null;

            var points = [];
            var lines = [];

            for ( var index in route.wps) {
                currentPoint = embryo.map
                        .createPoint(route.wps[index].longitude, route.wps[index].latitude);

                // points.push(embryo.route.createWaypointFeature(currentPoint));
                if (!firstPoint) {
                    lines.push(new OpenLayers.Geometry.LineString([ previousPoint, currentPoint ]));
                }
                firstPoint = false;
                previousPoint = currentPoint;
            }

            var multiLine = new OpenLayers.Geometry.MultiLineString(lines);
            var feature = new OpenLayers.Feature.Vector(multiLine, {
                featureType : 'route',
                route : route,
                colorKey : colorKey
            });

            features.push(feature);
        }
        return features;
    };

    this.draw = function(route, colorKey) {
        this.layers.route.removeAllFeatures();

        if (route && route.wps) {
            this.layers.route.addFeatures(createVectorFeatures(route, colorKey));
            this.layers.route.refresh();
        }
    }
}

RouteLayer.prototype = new EmbryoLayer();

