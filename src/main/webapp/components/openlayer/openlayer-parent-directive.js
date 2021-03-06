(function () {
    'use strict';

    /**
     * Base map directive.
     * <p/>
     * Inspiration:
     * https://github.com/tombatossals/angular-openlayers-directive
     * https://github.com/NiordOrg/niord
     * <p/>
     * Example usage:
     * <pre>
     *   <ol-map class="map">
     *      <map-mouse-position></map-mouse-position>
     *   </ol-map>
     * </pre>
     */
    angular
        .module('embryo.components.openlayer')
        /**
         * Defines the parent openlayer directive which is responsible for bridging between angular and openlayers.
         */
        .directive('openlayerParent', openlayerParent);

    openlayerParent.$inject = ['$q', '$timeout', 'OpenlayerService'];

    function openlayerParent($q, $timeout, OpenlayerService) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template: '<div class="map {{class}}" ng-transclude></div>',
            scope: {},

            controller: function ($scope) {
                var _map = $q.defer();

                $scope.getMap = function () {
                    return _map.promise;
                };

                $scope.setMap = function (map) {
                    _map.resolve(map);
                };

                this.getOpenlayersScope = function () {
                    return $scope;
                };
            },

            link: function (scope, element, attrs) {
                var isDefined = angular.isDefined;
                // Disable rotation on mobile devices
                var controls = ol.control.defaults({rotate: false});
                var interactions = ol.interaction.defaults({
                    altShiftDragRotate: true,
                    pinchRotate: true,
                    zoomDuration: 0
                });

                var coords = [ol.proj.fromLonLat([-180, -90], undefined), ol.proj.fromLonLat([180, 90], undefined)];
                var arcticExtent = ol.extent.boundingExtent(coords);
                var defaultOsmUrl = 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                // var osmUrl = embryo.authentication.osm ? embryo.authentication.osm.replace(/\$/g, '') : defaultOsmUrl;
                var layers = [new ol.layer.Group({
                    'title': 'Base maps',
                    layers: [
                        new ol.layer.Tile({
                            title: 'OpenStreetMap',
                            type: 'base',
                            visible: true,
                            source: new ol.source.OSM({url: defaultOsmUrl})
                        })
                    ]
                })];
                var view = new ol.View({
                    resolution: 7000,
                    resolutions: [OpenlayerService.maxResolution, 10000, 7000, 5000, 4000, 3000, 2000, 1000, 600, 400, 300, 200, 130, 80, 45, 30, 15, OpenlayerService.minResolution],
                    center: ol.proj.fromLonLat([-44, 69], undefined),
                    extent: arcticExtent
                });
                var map = new ol.Map({
                    target: angular.element(element)[0],
                    layers: layers,
                    view: view,
                    controls: controls,
                    interactions: interactions
                });


                // Update the map size if the element size changes.
                // In theory, this should not be necessary, but it seems to fix a problem
                // where maps are sometimes distorted
                var updateSizeTimer;


                // Clean-up
                element.on('$destroy', function () {
                    if (isDefined(updateSizeTimer)) {
                        $timeout.cancel(updateSizeTimer);
                        updateSizeTimer = null;
                    }
                });
                scope.updateSize = function () {
                    updateSizeTimer = null;
                    map.updateSize();
                };

                var updateSizeEventHandler = function () {
                    if (isDefined(updateSizeTimer)) {
                        $timeout.cancel(updateSizeTimer);
                    }
                    updateSizeTimer = $timeout(scope.updateSize, 100);
                };

                scope.$watch(function () {
                    return element[0].clientWidth;
                }, updateSizeEventHandler);
                scope.$watch(function () {
                    return element[0].clientHeight;
                }, updateSizeEventHandler);

                // Resolve the map object to the promises
                scope.setMap(map);
            }
        };
    }

})();