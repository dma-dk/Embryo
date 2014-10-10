(function() {
    "use strict";
    angular.module('embryo.map', [ 'ui.bootstrap', 'embryo.menu', 'embryo.yourvessel.control', 'embryo.vessel.control',
            'embryo.reporting.control', 'embryo.greenpos', 'embryo.vessel.controller', 'embryo.ice.control',
            'embryo.msi.controllers', 'embryo.routeUpload', 'embryo.schedule', 'embryo.routeEdit', 'embryo.decimal',
            'embryo.authentication', 'embryo.shape', 'embryo.zoom', 'embryo.metoc', 'embryo.weather.control',
            'embryo.controller.reporting', 'embryo.aisinformation', 'embryo.forecast.control' ]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, [ 'embryo.map' ]);
    });
})();
