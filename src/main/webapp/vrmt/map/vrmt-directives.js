angular.module('vrmt.map')

    .directive('route', [function () {
        return {
            restrict: 'E',
            require: '^olMap',
            scope: {
                route: '=',
                assessmentLocationEvent: '='
            },
            link: function (scope, element, attrs, ctrl) {
                var route = angular.isDefined(scope.route.wps) ? scope.route : undefined;
                var routeLayer;

                var olScope = ctrl.getOpenlayersScope();
                olScope.getMap().then(function (map) {

                    // Clean up when the scope is destroyed
                    scope.$on('$destroy', function () {
                        if (angular.isDefined(routeLayer)) {
                            map.removeLayer(routeLayer);
                        }
                        if (onMoveKey) {
                            map.unByKey(onMoveKey);
                        }
                        if (onclickKey) {
                            map.unByKey(onclickKey);
                        }
                    });

                    var source = new ol.source.Vector();

                    routeLayer = new ol.layer.Vector({
                        source: source,
                        style: new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: '#FF0000',
                                width: 2,
                                lineDash: [5, 5, 0, 5]
                            }),
                            image: new ol.style.Circle({
                                radius: 4,
                                stroke: new ol.style.Stroke({
                                    color: '#FF0000',
                                    width: 1
                                })
                            })
                        })
                    });

                    scope.$watch("route", function (newRoute) {
                        if (newRoute && newRoute.wps) {
                            addOrReplaceRoute(newRoute);
                        }
                    });

                    function addOrReplaceRoute(route) {
                        source.clear();

                        var markers = [];
                        angular.forEach(route.wps, function (wp) {
                            var m = ol.proj.transform([wp.longitude, wp.latitude], 'EPSG:4326', 'EPSG:3857');
                            markers.push(m);
                            var pointFeature = new ol.Feature({
                                geometry: new ol.geom.Point(m)
                            });

                            source.addFeature(pointFeature);
                        });

                        // Create feature with linestring
                        var line = new ol.geom.LineString(markers, 'XY');
                        var feature = new ol.Feature({
                            geometry: line
                        });
                        source.addFeature(feature);
                    }


                    var onMoveKey = map.on('pointermove', function(e) {
                        var pixel = map.getEventPixel(e.originalEvent);
                        var hit = map.hasFeatureAtPixel(pixel);

                        map.getTarget().style.cursor = hit ? 'pointer' : '';
                    });

                    var onclickKey = map.on('singleclick', function(e) {
                        var pixel = map.getEventPixel(e.originalEvent);
                        var hit = map.hasFeatureAtPixel(pixel, function (layerCandidate) {
                            return layerCandidate == routeLayer;
                        });

                        if (hit) {
                            var coord = ol.proj.toLonLat(map.getEventCoordinate(e.originalEvent));
                                scope.assessmentLocationEvent['event'] = {
                                    lon: coord[0],
                                    lat: coord[1]
                                };
                        }
                        scope.$apply();

                    });

                    routeLayer.setVisible(true);
                    map.addLayer(routeLayer);
                })
            }
        };
    }])
    .directive('assessmentLocations', [function () {
        return {
            restrict: 'E',
            require: '^olMap',
            scope: {
                locations: '='
            },
            link: function (scope, element, attrs, ctrl) {
                var locationLayer = createLocationLayer();

                function createLocationLayer() {
                    return new ol.layer.Vector({
                        source: new ol.source.Vector()
                    });
                }

                function addOrReplaceLocation(location) {
                    var coord = ol.proj.transform([location.lon, location.lat], 'EPSG:4326', 'EPSG:3857');
                    var locationFeature = new ol.Feature({
                        geometry: new ol.geom.Point(coord)
                    });
                    locationFeature.setId(location.id);
                    locationFeature.setStyle(createLocationStyle(location));
                    locationLayer.getSource().addFeature(locationFeature);

                }

                function createLocationStyle(location) {
                    var font = 'bold' + ' ' + '12px' + ' ' + 'Arial';
                    return new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 6,
                            fill: new ol.style.Fill({
                                color: 'rgba(255, 0, 0, 0.8)'
                            }),
                            stroke: new ol.style.Stroke({
                                color: 'black',
                                width: 1
                            })
                        }),
                        text: new ol.style.Text({
                            textAlign: 'start',
                            // textBaseline: baseline,
                            font: font,
                            text: '' + location.id,
                            fill: new ol.style.Fill({color: 'green'}),
                            stroke: new ol.style.Stroke({color: 'white', width: 3}),
                            offsetX: 10,
                            offsetY: 9,
                            rotation: 0
                        })
                    });
                }


                scope.$watch("locations", function (newLocations) {
                    if (newLocations && newLocations.length > 0) {
                        locationLayer.getSource().clear();
                        newLocations.forEach(function (location) {
                            addOrReplaceLocation(location);
                        });
                    }
                });

                var olScope = ctrl.getOpenlayersScope();
                olScope.getMap().then(function (map) {
                    map.addLayer(locationLayer);

                    var onclickKey = map.on('singleclick', function(e) {
                        var pixel = map.getEventPixel(e.originalEvent);
                        var hit = map.hasFeatureAtPixel(pixel, function (layerCandidate) {
                            return layerCandidate == locationLayer;
                        });

                        if (hit) {
                            var coord = ol.proj.toLonLat(map.getEventCoordinate(e.originalEvent));
                            scope.assessmentLocationEvent['locationChosenEvent'] = {
                                lon: coord[0],
                                lat: coord[1]
                            };
                        }
                        scope.$apply();

                    });

                    // Clean up when the scope is destroyed
                    scope.$on('$destroy', function () {
                        if (angular.isDefined(locationLayer)) {
                            map.removeLayer(locationLayer);
                        }
                        if (onclickKey) {
                            map.unByKey(onclickKey);
                        }

                    });

                });
            }
        };
    }])
    .directive('vessel', [function () {
        return {
            restrict: 'E',
            require: '^olMap',
            scope: {
                vessel: '='
            },
            link: function (scope, element, attrs, ctrl) {
                var vesselLayer = createVesselLayer();
                addOrReplaceVessel(scope.vessel);

                function createVesselLayer() {
                    return new ol.layer.Vector({
                        source: new ol.source.Vector(),
                        style: createVesselStyle()
                    });
                }

                function createVesselStyle() {
                    return new ol.style.Style({
                        image: new ol.style.Icon(({
                            anchor: [0.85, 0.5],
                            opacity: 0.85,
                            src: 'img/vessel_purple.png'
                        }))
                    });
                }

                function addOrReplaceVessel(vessel) {
                    if (vessel && vessel.aisVessel) {
                        addOrReplaceVesselFeature(vessel.aisVessel.lat, vessel.aisVessel.lon);
                        updateStyle(((vessel.aisVessel.cog - 90) * (Math.PI / 180)));
                    }
                }

                function addOrReplaceVesselFeature(lat, lon) {
                    var source = vesselLayer.getSource();
                    source.clear();
                    var vesselFeature = new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'))
                    });

                    source.addFeature(vesselFeature);
                }

                function updateStyle(radian) {
                    vesselLayer.getStyle().getImage().setRotation(radian);
                }

                scope.$watch("vessel", function (newVessel) {
                    if (newVessel && newVessel.aisVessel) {
                        addOrReplaceVessel(newVessel);
                    }
                });

                var olScope = ctrl.getOpenlayersScope();
                olScope.getMap().then(function (map) {
                    map.addLayer(vesselLayer);

                    // Clean up when the scope is destroyed
                    scope.$on('$destroy', function () {
                        if (angular.isDefined(vesselLayer)) {
                            map.removeLayer(vesselLayer);
                        }
                    });
                })
            }
        };
    }])
    .directive('indexColor', [function () {
        return {
            restrict: 'E',
            template: "<span style='background-color: {{color}};color: transparent;font-family: Courier New'>{{zeroPad}}</span><span style='background-color: {{color}}; color: {{textColor}}; padding-right: 1px;padding-left: 1px;font-family: Courier New'>{{index}}</span>",
            scope: {
                index: '='
            },
            link: function (scope) {
                scope.color = null;
                scope.textColor = "white";
                scope.zeroPad = "";
                function setColorForIndex(index) {
                    scope.textColor = "white";
                    if (index === '-') {
                        scope.color = "transparent";
                        scope.textColor = "black";
                    } else if (index < 1000) {
                        scope.color = "green";
                    } else if (index > 2000) {
                        scope.color = "red";
                    } else {
                        scope.color = "yellow";
                        scope.textColor = "black";
                    }
                }

                function adjustZeroPad(newIndex) {
                    if (angular.isNumber(newIndex)) {
                        var length = newIndex.toString().length;
                        scope.zeroPad = "0".repeat(4 - length);
                    } else {
                        scope.zeroPad = "0";
                    }

                }

                scope.$watch('index', function (newIndex) {
                    setColorForIndex(newIndex);
                    adjustZeroPad(newIndex);
                });
            }
        }
    }])
;