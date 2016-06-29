angular.module('vrmt.map')

    .directive('route', [function () {
        return {
            restrict: 'E',
            require: '^olMap',
            scope: {
                route: '=',
                assessmentLocationState: '='
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


                    var onMoveKey = map.on('pointermove', function (e) {
                        var pixel = map.getEventPixel(e.originalEvent);
                        var hit = map.hasFeatureAtPixel(pixel);

                        map.getTarget().style.cursor = hit ? 'pointer' : '';
                    });

                    var onclickKey = map.on('singleclick', function (e) {
                        var pixel = map.getEventPixel(e.originalEvent);
                        var hitThis = map.hasFeatureAtPixel(pixel, function (layerCandidate) {
                            return layerCandidate === routeLayer;
                        });

                        var hitOther = map.hasFeatureAtPixel(pixel, function (layerCandidate) {
                            return layerCandidate !== routeLayer;
                        });

                        if (hitThis && !hitOther) {
                            var coord = ol.proj.toLonLat(map.getEventCoordinate(e.originalEvent));
                            scope.assessmentLocationState['new'] = {
                                route: {
                                    lon: coord[0],
                                    lat: coord[1]
                                }
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
                locations: '=',
                assessmentLocationState: '='
            },
            link: function (scope, element, attrs, ctrl) {
                var olScope = ctrl.getOpenlayersScope();
                /**
                 * Layer creation functionality
                 */
                var locationLayer = createLocationLayer();

                function createLocationLayer() {
                    return new ol.layer.Vector({
                        source: new ol.source.Vector(),
                        style: createLocationStyleFunction()
                    });
                }

                function addOrReplaceLocation(latestAssessment) {
                    var location = latestAssessment.location;
                    var coord = ol.proj.transform([location.lon, location.lat], 'EPSG:4326', 'EPSG:3857');
                    var locationFeature = new ol.Feature({
                        geometry: new ol.geom.Point(coord)
                    });
                    locationFeature.setId(location.id);
                    locationFeature.set("assessmentLocation", latestAssessment, true);
                    locationLayer.getSource().addFeature(locationFeature);
                }

                function createLocationStyleFunction() {
                    return function (feature, resolution) {
                        var latestAssessment = feature.get("assessmentLocation");
                        var style = createStyle(latestAssessment, 'black', 1);
                        return [style];
                    };
                }

                function createSelectedLocationStyleFunction() {
                    return function (feature, resolution) {
                        var latestAssessment = feature.get("assessmentLocation");
                        var style = createStyle(latestAssessment, 'blue', 2);
                        return [style];
                    };
                }

                function createStyle(latestAssessment, strokeColor, strokeWidth) {
                    var text = '' + latestAssessment.location.id;
                    var fillColor = 'black';
                    var index = latestAssessment.index;
                    if (index > 0) fillColor = 'green';
                    if (index > 1000) fillColor = 'yellow';
                    if (index > 2000) fillColor = 'red';

                    return new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 6,
                            fill: new ol.style.Fill({
                                color: fillColor
                            }),
                            stroke: new ol.style.Stroke({
                                color: strokeColor,
                                width: strokeWidth
                            })
                        }),
                        text: new ol.style.Text({
                            textAlign: 'start',
                            font: 'bold 12px Arial',
                            text: text,
                            fill: new ol.style.Fill({color: 'green'}),
                            stroke: new ol.style.Stroke({color: 'white', width: 3}),
                            offsetX: 10,
                            offsetY: 9,
                            rotation: 0
                        })
                    });
                }


                /**
                 * Model listeners
                 */
                scope.$watch("locations", function (newLocations) {
                    if (newLocations && newLocations.length > 0) {
                        locationLayer.getSource().clear();
                        newLocations.forEach(function (latestAssessment) {
                            addOrReplaceLocation(latestAssessment);
                        });
                    }
                });
                scope.$watch("assessmentLocationState['chosen']", function (newValue, oldValue) {
                    if (newValue && (newValue !== oldValue || select.getFeatures().getLength() === 0)) {
                        select.getFeatures().clear();

                        var featureToSelect = locationLayer.getSource().getFeatureById(newValue.location.id);
                        select.getFeatures().push(featureToSelect);
                        panToFeature(featureToSelect);
                    }
                });

                /**
                 * Interactions
                 */
                var select = new ol.interaction.Select({
                    layers: [locationLayer],
                    style: createSelectedLocationStyleFunction()
                });

                select.on('select', function (e) {
                    if (e.selected.length == 1) {
                        var selectedFeature = e.selected[0];
                        scope.assessmentLocationState['chosen'] = selectedFeature.get("assessmentLocation");
                    }

                    scope.$apply();
                });


                function panToFeature(feature) {
                    olScope.getMap().then(function (map) {
                        var view = map.getView();
                        var featureExtent = feature.getGeometry().getExtent();
                        var mapExtent = view.calculateExtent(map.getSize());
                        if (!ol.extent.containsExtent(mapExtent, featureExtent)) {
                            view.fit(feature.getGeometry(), map.getSize(), {minResolution: view.getResolution()});
                        }
                    });
                }

                /**
                 * Map initialization
                 */
                olScope.getMap().then(function (map) {
                    map.addLayer(locationLayer);
                    map.addInteraction(select);

                    var onclickKey = map.on('singleclick', function (e) {
                        var pixel = map.getEventPixel(e.originalEvent);
                        var hitThis = map.hasFeatureAtPixel(pixel, function (layerCandidate) {
                            return layerCandidate === locationLayer;
                        });

                        if (hitThis) {
                            scope.assessmentLocationState['locationClick'] = {
                                x: e.originalEvent.clientX,
                                y: e.originalEvent.clientY
                            };
                        }
                        scope.$apply();

                    });
                    // Clean up when the scope is destroyed
                    scope.$on('$destroy', function () {
                        if (angular.isDefined(locationLayer)) {
                            map.removeLayer(locationLayer);
                        }
                        if (select) {
                            map.removeInteraction(select);
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
                mapState: '=',
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

                    var onclickKey = map.on('singleclick', function (e) {
                        var pixel = map.getEventPixel(e.originalEvent);
                        var hitThis = map.hasFeatureAtPixel(pixel, function (layerCandidate) {
                            return layerCandidate === vesselLayer;
                        });

                        if (hitThis) {
                            scope.mapState['vesselClick'] = {
                                x: e.originalEvent.clientX,
                                y: e.originalEvent.clientY
                            };
                        }
                        scope.$apply();

                    });
                    
                    // Clean up when the scope is destroyed
                    scope.$on('$destroy', function () {
                        if (angular.isDefined(vesselLayer)) {
                            map.removeLayer(vesselLayer);
                        }
                        if (onclickKey) {
                            map.unByKey(onclickKey);
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
    .directive("outsideClick", ['$document', function ($document) {
        return {
            link: function ($scope, $element, $attributes) {
                var scopeExpression = $attributes.outsideClick;
                var onDocumentClick = function (event) {
                    var isChild = $element.find(event.target).length > 0;

                    if (!isChild) {
                        $scope.$apply(scopeExpression);
                    }
                };

                $document.on("click", onDocumentClick);

                $element.on('$destroy', function () {
                    $document.off("click", onDocumentClick);
                });
            }
        }
    }])
    .directive("onEscape", ['$document', function ($document) {
        return {
            link: function ($scope, $element, $attributes) {
                var scopeExpression = $attributes.onEscape;
                var onEsc = function (event) {
                    var isEsc = event.which === 27;

                    if (isEsc) {
                        $scope.$apply(scopeExpression);
                    }
                };

                $document.on("keydown", onEsc);

                $element.on('$destroy', function () {
                    $document.off("keydown", onEsc);
                });
            }
        }
    }])
;