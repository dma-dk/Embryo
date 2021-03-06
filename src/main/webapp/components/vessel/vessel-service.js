(function () {
    var module = angular.module('embryo.components.vessel');

    var subscriptions = {};

    embryo.getMaxSpeed = function (vessel) {

        if (vessel.awsog) {
            return vessel.awsog;
        } else if (vessel.ssog) {
            return vessel.ssog
        } else if (vessel.sog) {
            return vessel.sog;
        } else {
            return 0.0;
        }
    };

    module.service('VesselService', VesselService);
    VesselService.$inject = ['$http', '$timeout', 'NotifyService', 'VesselComponentEvents'];

    function VesselService($http, $timeout, NotifyService, VesselComponentEvents) {
        var service = {
            latestVessels: null,
            getLatest: function () {
                return this.latestVessels;
            },
            getVessel: function (mmsi) {
                if (this.latestVessels) {
                    return this.latestVessels.find(function (v) {
                        return Number(v.mmsi) === Number(mmsi);
                    })
                }
                return null;
            },
            list: function (success, error) {
                var messageId = embryo.messagePanel.show({
                    text: "Loading vessels ..."
                });

                $http.get(embryo.baseUrl + "rest/vessel/list", {
                    timeout: embryo.defaultTimeout
                }).then(function (response) {
                    var vessels = response.data;
                    embryo.messagePanel.replace(messageId, {
                        text: vessels.length + " vessels loaded.",
                        type: "success"
                    });
                    service.latestVessels = vessels;
                    NotifyService.notify(VesselComponentEvents.VesselsLoaded);
                    success(vessels);
                }).catch(function (response) {
                    var data = response.data;
                    var status = response.status;
                    var errorMsg = embryo.ErrorService.errorStatus(data, status, "loading vessels");
                    embryo.messagePanel.replace(messageId, {
                        text: errorMsg,
                        type: "error"
                    });
                    if (error) {
                        error(errorMsg, status);
                    }
                });
            },
            details: function (mmsi, success, error) {
                $http.get(embryo.baseUrl + "rest/vessel/details", {
                    timeout: embryo.defaultTimeout,
                    params: {
                        mmsi: mmsi
                    }
                })
                    .then(function (response) {
                        success(response.data);
                    })
                    .catch(function (response) {
                        var data = response.data;
                        var status = response.status;
                        error(embryo.ErrorService.errorStatus(data, status, "loading vessel data"), status);
                    });
            },
            saveDetails: function (details, success, error) {
                $http.post(embryo.baseUrl + "rest/vessel/save-details", details)
                    .then(function (response) {
                        success(response.data);
                    })
                    .catch(
                        function (response) {
                            var data = response.data;
                            var status = response.status;
                            var config = response.config;
                            error(embryo.ErrorService.extractError(data, status, config), status);
                        });
            },
            clientSideSearch: function (argument, callback) {
                if (!argument || argument === "")
                    return [];

                var result = [];

                function match(propertyValue, searchStr) {
                    if (!propertyValue) {
                        return false;
                    }
                    var value = ("" + propertyValue).toLowerCase();
                    return ((value.indexOf(searchStr) === 0) || (value.indexOf(" " + searchStr) >= 0));
                }

                $.each(embryo.vessel.allVessels(), function (k, v) {
                    var searchStr = argument.toLowerCase();
                    if (match(v.name, searchStr) || match(v.mmsi, searchStr) || match(v.callSign, searchStr)) {
                        result.push(v);
                    }
                });

                callback(result);
            },
            updateVesselDetailParameter: function (mmsi, name, value) {
                var s = subscriptions[mmsi];
                if (s) {
                    eval("s.vesselDetails." + name + "='" + value + "'");
                    this.fireVesselDetailsUpdate(s.vesselDetails);
                }
            },
            fireVesselDetailsUpdate: function (vesselDetails) {
                var s = subscriptions[vesselDetails.aisVessel.mmsi];
                if (s) {
                    s.vesselDetails = vesselDetails;
                    for (var i in s.callbacks) {
                        // function x(){
                        // var count = i;
                        // s.callbacks[count]();
                        // }
                        // setTimeout(x, 10);

                        (function (callback) {
                            setTimeout(function () {
                                callback(null, s.vesselDetails)
                            }, 10);
                        })(s.callbacks[i]);
                    }
                }
            },
            subscribe: function (mmsi, callback) {
                if (!subscriptions[mmsi])
                    subscriptions[mmsi] = {
                        callbacks: [],
                        vesselDetails: null,
                        interval: null
                    };

                var s = subscriptions[mmsi];
                var id = s.callbacks.push(callback) - 1;
                var that = this;

                function lookup() {
                    that.details(mmsi, function (vesselDetails) {
                        embryo.vesselDetails = vesselDetails;
                        s.vesselDetails = vesselDetails;
                        for (var i in s.callbacks)
                            if (s.callbacks[i])
                                s.callbacks[i](null, vesselDetails);
                    }, function (error) {
                        for (var i in s.callbacks)
                            if (s.callbacks[i])
                                s.callbacks[i](error);
                    })
                }

                if (s.interval === null) {
                    s.interval = setInterval(lookup, embryo.loadFrequence);
                    lookup(mmsi, callback);
                }

                if (s.vesselDetails) {
                    callback(null, s.vesselDetails)
                }
                return {
                    id: id,
                    mmsi: mmsi
                }
            },
            unsubscribe: function (unsubscription) {
                var s = subscriptions[unsubscription.mmsi];
                s.callbacks.splice(unsubscription.id, 1);
                var allDead = s.callbacks.length === 0;
                if (allDead) {
                    clearInterval(s.interval);
                    subscriptions[unsubscription.mmsi] = null
                }
            },
            clientSideMmsiSearch: function (mmsi, callback) {
                var that = this;
                var result = [];
                if (embryo.vessel.allVessels()) {
                    $.each(embryo.vessel.allVessels(), function (k, v) {
                        if (Number(mmsi) === Number(v.mmsi)) {
                            result.push(v);
                        }
                    });
                    callback(result[0]);
                } else {
                    var cancel = $timeout(function () {
                        that.clientSideMmsiSearch(mmsi, callback);
                        $timeout.cancel(cancel)
                    }, 100);
                }
            },
            historicalTrack: function (vesselId, success, error) {
                $http.get(embryo.baseUrl + "rest/vessel/historical-track", {
                    timeout: embryo.defaultTimeout,
                    params: {
                        mmsi: vesselId
                    }
                })
                    .then(function (response) {
                        success(response.data);
                    })
                    .catch(function (response) {
                        var data = response.data;
                        var status = response.status;

                        error(embryo.ErrorService.errorStatus(data, status, "loading historical track"), status);
                    });
            }
        };
        return service;
    }

    embryo.eventbus.VesselInformationAddedEvent = function () {
        var event = jQuery.Event("VesselInformationAddedEvent");
        return event;
    };

    embryo.eventbus.registerShorthand(embryo.eventbus.VesselInformationAddedEvent, "vesselInformationAddedEvent");

    module.service('VesselInformation', VesselInformation);
    VesselInformation.$inject = [];

    function VesselInformation() {
        var vesselInformations = [];
        var that = this;

        this.addInformationProvider = function (info) {
            for (var index in vesselInformations) {
                var vi = vesselInformations[index];
                if (vi.title === info.title && (vi.type && info.type ? vi.type === info.type : true)) {
                    // already added. Replace
                    vesselInformations[index] = info;
                    return;
                }
            }
            vesselInformations.push(info);
            embryo.eventbus.fireEvent(embryo.eventbus.VesselInformationAddedEvent());
        };

        this.getVesselInformation = function () {
            return vesselInformations;
        };

        this.show = function (provider, vesselOverview, vesselDetails) {
            for (var index in vesselInformations) {
                var vi = vesselInformations[index];
                if (vi.title !== provider.title || (vi.type && provider.type ? vi.type !== provider.type : true)) {
                    that.hide(vi);
                }
            }
            provider.show(vesselOverview, vesselDetails);
        };

        this.hide = function (provider) {
            if (provider.hide)
                provider.hide();
            if (provider.close)
                provider.close();
        };

        this.hideAll = function () {
            for (var index in vesselInformations) {
                that.hide(vesselInformations[index]);
            }
        }

    }

    module.run(function (VesselService, VesselInformation) {
        if (!embryo.vessel)
            embryo.vessel = {};
        embryo.vessel.service = VesselService;
        embryo.vessel.information = VesselInformation;
    })
})();
