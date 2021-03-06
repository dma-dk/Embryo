(function () {
    'use strict';

    angular
        .module('embryo.components.openlayer')
        /**
         * Formats a position
         */
        .filter('lonlat', lonlat);

    lonlat.$inject = ['$rootScope'];

    function lonlat() {
        return function (input, args) {
            args = args || {};
            return input && input.lat && input.lon ? formatLatLon(input, args.decimals, args.pp).trim() : '';
        };
    }

})();