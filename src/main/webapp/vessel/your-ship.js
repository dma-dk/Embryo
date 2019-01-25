(function () {

    var module = angular.module('embryo.vessel');

    module.controller("YourVesselControl", YourVesselControl);
    YourVesselControl.$inject = ['$scope', 'VesselService', 'Subject', 'VesselInformation', 'SubscriptionService', 'VesselServiceFactory'];

    function YourVesselControl($scope, VesselService, Subject, VesselInformation, SubscriptionService, VesselServiceFactory) {
        var mmsi = Subject.getDetails().shipMmsi;

        $scope.$watch('vesselOverview', function (newValue, oldValue) {
            $scope.sections = initSections($scope);
        }, true);

        $scope.$watch('vesselDetails', function (newValue, oldValue) {
            $scope.sections = initSections($scope);
        }, true);

        $scope.$watch(function () {
            return embryo.vessel.information.getVesselInformation().length;
        }, function (newValue, oldValue) {

            if (newValue > 0 && newValue != oldValue) {
                $scope.sections = initSections($scope);
            }
        });

        var listSubscription = SubscriptionService.subscribe({
            subscriber: "YourVesselControl",
            name: "VesselService.list",
            fn: VesselService.list,
            interval: embryo.loadFrequence,
            success: function (vesselList) {
                // we don't need the vessel list, we just need to know, that a new version of vesselOverview
                // information for this particular vessel is available.
                VesselService.clientSideMmsiSearch(mmsi, function (vesselOverview) {
                    $scope.vesselOverview = vesselOverview;
                    $scope.vesselScope.yourVesselName = vesselOverview.name;
                })
            }
        });

        var detailsSubscription = VesselService.subscribe(mmsi, function (error, vesselDetails) {
            if (!error) {
                $scope.yourAis = yourAis(vesselDetails);
                $scope.vesselDetails = vesselDetails;
            }
        });

        function yourAis(data) {
            if (!data.aisVessel) {
                return null;
            }
            return embryo.vessel.aisToArray({
                "MMSI": data.aisVessel.mmsi,
                "Call Sign": data.aisVessel.callsign,
                "Country": data.aisVessel.country,
                "Destination": data.aisVessel.destination,
                "Nav Status": embryo.vessel.navStatusText(data.aisVessel.navStatus),
                "ETA": data.aisVessel.eta ? formatTime(data.aisVessel.eta) + " UTC" : ""
            });
        }

        $scope.viewAis = function ($event) {
            $event.preventDefault();
            VesselInformation.hideAll();
            embryo.controllers.ais.show($scope.vesselDetails.aisVessel);
        };

        $scope.$on("$destroy", function () {
            SubscriptionService.unsubscribe(listSubscription);
            VesselService.unsubscribe(detailsSubscription);
        });

        var awNameSequence = ["Vessel Information", "Schedule", "Reporting"];
        var awSorter = embryo.vessel.createSorter(awNameSequence);
        var awFilter = embryo.vessel.createFilter(awNameSequence, function (provider, index, array) {
            return provider.type === 'edit';
        });

        function initSections(scope) {
            if (!scope.vesselOverview || !scope.vesselDetails) {
                return [];
            }

            var sections = [{
                name: "Arctic Reporting",
                services: [],
                type: "edit"
            }, {
                name: "Additional Information ",
                services: [],
                type: "view"
            }];

            var vesselInformation = embryo.vessel.information.getVesselInformation().filter(awFilter);
            for (var i in vesselInformation) {
                sections[0].services.push(VesselServiceFactory.createService(vesselInformation[i], scope));
            }
            sections[0].services.sort(awSorter);

            sections[1].services.push(VesselServiceFactory.createNearestShips(scope));
            sections[1].services.push(VesselServiceFactory.createDistanceCircles(scope));

            return sections;
        }

    }

    module.controller("ZoomYourVesselCtrl", ZoomYourVesselCtrl);
    ZoomYourVesselCtrl.$inject = ['$scope', 'Subject'];

    function ZoomYourVesselCtrl($scope, Subject) {
        $scope.zoomToYourVessel = function () {
            embryo.vessel.goToVesselLocation(embryo.vessel.lookupVessel(Subject.getDetails().shipMmsi));
        }
    }
})();
