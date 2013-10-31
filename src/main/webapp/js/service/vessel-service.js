(function() {
    var module = angular.module('embryo.vessel', []);

    module.service('VesselService', function() {
        return {
            list: function(callback) {
                $.ajax({
                    url: embryo.baseUrl + "rest/vessel/list",
                    timeout: embryo.defaultTimeout,
                    success: function(data) {
                        callback(null, data);
                    },
                    error: function(data) {
                        callback(data);
                    }
                });
            },
            details: function(mmsi, callback) {
                $.ajax({
                    url: embryo.baseUrl + "rest/vessel/details",
                    timeout: embryo.defaultTimeout,
                    data: {
                        mmsi : mmsi
                    },
                    success: function(data) {
                        callback(null, data);
                    },
                    error: function(data) {
                        callback(data);
                    }
                });
            },
            search: function(argument, callback) {
                $.ajax({
                    url: embryo.baseUrl + "json_proxy/vessel_search",
                    timeout: embryo.defaultTimeout,
                    data: {
                        argument: argument
                    },
                    success: function(data) {
                        callback(null, data.vessels)
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        callback(jqXHR, null);
                    }
                })
            },
            saveDetails: function(details, callback) {
                $.ajax({
                    url: embryo.baseUrl + "rest/vessel/save-details",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(details),
                    success: function(data) {
                        callback(null, data);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        callback(jqXHR, null);
                    }
                })
            },
            clientSideSearch: function(argument, callback) {
                if (argument == null || argument == "") return [];

                var result = [];

                $.each(embryo.vessel.allVessels(), function (k,v) {
                    if (v.name) {
                        if ((v.name.toLowerCase().indexOf(argument.toLowerCase()) == 0) || 
                            (v.name.toLowerCase().indexOf(" "+argument.toLowerCase()) >= 0)) {
                            result.push(v);
                        }
                    }
                })

                callback(result);
            },
            subscribe: function (mmsi, callback) {
                var that = this;
                function lookupStepTwo(vesselOverview) {
                    if (vesselOverview) {
                        that.details(vesselOverview.mmsi, function(error, vesselDetails) {
                            if (vesselDetails) {
                                callback(null, vesselOverview, vesselDetails);
                            } else {
                                callback(error);
                            }
                        })
                    } else {
                        callback("unable to find "+mmsi);
                    }
                }

                function lookup() {
                    that.clientSideMmsiSearch(mmsi, lookupStepTwo);
                }

                lookup(mmsi, callback);

                return setInterval(lookup, embryo.loadFrequence);
            },
            unsubscribe: function (id) {
                clearInterval(id);
            },
            clientSideMmsiSearch: function(mmsi, callback) {
                var that = this;
                var result = [];

                if (embryo.vessel.allVessels()) {
                    $.each(embryo.vessel.allVessels(), function (k,v) {
                        if (mmsi == v.mmsi) {
                            result.push(v);
                        }
                    })
                    callback(result[0]);
                } else {
                    setTimeout(function() {
                        that.clientSideMmsiSearch(mmsi, callback);
                    }, 100);
                }
            },
            historicalTrack: function(vesselId, callback) {
                $.ajax({
                    url: embryo.baseUrl + "rest/vessel/historical-track",
                    timeout: embryo.defaultTimeout,
                    data: {
                        id : vesselId
                    },
                    success: function(data) {
                        callback(null, data);
                    },
                    error: function(data) {
                        callback(data);
                    }
                });
            }
        };
    });

    module.run(function(VesselService) {
        if (!embryo.vessel) embryo.vessel = {};
        embryo.vessel.service = VesselService;
    })
})();