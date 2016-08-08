(function () {
    'use strict';

    angular
        .module('vrmt.map')
        .directive('vessel', vessel);

    function vessel() {
        var directive = {
            restrict: 'E',
            require: '^olMap',
            scope: {
                mapState: '=',
                vessel: '='
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
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
    }
})();