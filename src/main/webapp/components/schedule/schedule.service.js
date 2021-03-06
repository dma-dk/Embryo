(function () {
    "use strict";

    var scheduleUrl = embryo.baseUrl + 'rest/schedule/';

    var scheduleServiceModule = angular.module('embryo.schedule');

    scheduleServiceModule.factory('ScheduleService', ScheduleService);
    ScheduleService.$inject = ['$http', 'SessionStorageService', 'RouteService'];

    function ScheduleService($http, SessionStorageService, RouteService) {
        var currentSchedule = 'schedule_current';

        function buildVoyageInfo(index, schecule) {
            var result = {
                id: schecule.voyages[index].maritimeId,
                dep: schecule.voyages[index].location,
                depEta: schecule.voyages[index].departure,
                depLat: schecule.voyages[index].latitude,
                depLon: schecule.voyages[index].longitude,
                crew: schecule.voyages[index].crew,
                passengers: schecule.voyages[index].passengers
            };
            if (schecule.voyages[index].route) {
                result.routeId = schecule.voyages[index].route.id;
            }
            if (index < schecule.voyages.length - 1) {
                result.des = schecule.voyages[index + 1].location;
                result.desEta = schecule.voyages[index + 1].arrival;
                result.desLat = schecule.voyages[index + 1].latitude;
                result.desLon = schecule.voyages[index + 1].longitude;
            }
            return result;
        }

        return {
            getActiveVoyage: function (mmsi, routeId, callback, error) {
                function findVoyageIndex(schedule) {
                    for (var index = 0; index < schedule.voyages.length; index++) {
                        if (schedule.voyages[index].route && schedule.voyages[index].route.id === routeId) {
                            return index;
                        }
                    }
                    return null;
                }

                this.getYourSchedule(mmsi, function (schedule) {
                    var index = findVoyageIndex(schedule);
                    if (index === null) {
                        callback(null);
                        return;
                    }
                    var voyageInfo = buildVoyageInfo(index, schedule);
                    callback(voyageInfo);
                }, function (errorMsgs) {
                    error(errorMsgs);
                });
            },
            getYourSchedule: function (mmsi, callback, error) {
                var remoteCall = function (onSuccess) {
                    $http.get(scheduleUrl + mmsi)
                        .then(function (response) {
                            onSuccess(response.data);
                        })
                        .catch(function (data, status, headers, config) {
                            error(embryo.ErrorService.extractError(data, status, config));
                        });
                };
                SessionStorageService.getItem(currentSchedule, callback, remoteCall);
            },
            clearYourSchedule: function () {
                SessionStorageService.removeItem(currentSchedule);
            },
            getSchedule: function (mmsi, callback, error) {
                $http.get(scheduleUrl + mmsi)
                    .then(function (response) {
                        callback(response);
                    })
                    .catch(function (response) {
                        var data = response.data;
                        var status = response.status;
                        var config = response.config;
                        error(embryo.ErrorService.extractError(data, status, config));
                    });
            },
            getVoyageInfo: function (mmsi, voyageId, callback, error) {
                function findVoyageIndex(voyageId, schedule) {
                    for (var index = 0; index < schedule.voyages.length; index++) {
                        if (schedule.voyages[index].maritimeId === voyageId) {
                            return index;
                        }
                    }
                    return null;
                }

                this.getYourSchedule(mmsi, function (schedule) {
                    var index = findVoyageIndex(voyageId, schedule);
                    if (index === null) {
                        callback(null);
                        return;
                    }
                    var voyageInfo = buildVoyageInfo(index, schedule);
                    callback(voyageInfo);
                }, function (errorMsgs) {
                    error(errorMsgs);
                });
            },
            save: function (schedule, callback, error) {
                var routeIds = schedule.voyages
                    .filter(function (voyage) {
                        return !!voyage.route;
                    })
                    .map(function (voyage) {
                        return voyage.route.id;
                    });
                for (var index in schedule.voyages) {
                    delete schedule.voyages[index].route;
                }

                $http.put(scheduleUrl + 'save', schedule)
                    .then(function () {
                        SessionStorageService.removeItem(currentSchedule);
                        RouteService.clearFromCache(routeIds);
                        callback();
                    })
                    .catch(function (response) {
                        var data = response.data;
                        var status = response.status;
                        var config = response.config;
                        error(embryo.ErrorService.extractError(data, status, config));
                    });
            }
        };
    }
})();
