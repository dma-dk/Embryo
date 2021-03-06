(function() {
    "use strict";
    var indexApp = angular.module('embryo.front', [ 'embryo.menu', 'embryo.user', 'ui.bootstrap.carousel', 'angular-growl']);

    indexApp.config([ 'growlProvider', '$locationProvider', function(growlProvider, $locationProvider) {
        $locationProvider.hashPrefix("");

        growlProvider.globalTimeToLive(10000);
        growlProvider.globalPosition('bottom-left');

    } ]);

    $(function() {
        embryo.authentication.currentPageRequiresAuthentication = false;
    });
})();

