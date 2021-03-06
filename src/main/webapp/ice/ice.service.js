(function () {
    var module = angular.module('embryo.ice');

    module.service('IceService', IceService);
    IceService.$inject = ['$http'];

    function IceService($http) {
        function listByChartType(type, success, error) {
            var messageId = embryo.messagePanel.show({
                text: "Requesting list of ice charts ..."
            });

            function onSuccess(data) {
                embryo.messagePanel.replace(messageId, {
                    text: "List of " + data.length + (type === "iceberg" ? " icebergs" : " ice charts")
                    + " downloaded.",
                    type: "success"
                });
                success(data);
            }

            function onError(data, status) {
                var txt = "requesting list of ice charts";
                var errorMsg = embryo.ErrorService.errorStatus(data, status, txt);
                embryo.messagePanel.replace(messageId, {
                    text: errorMsg,
                    type: "error"
                });
                error(errorMsg, status);
            }

            $http.get(embryo.baseUrl + "rest/ice/" + type + "/observations", {
                timeout: embryo.defaultTimeout
            })
                .then(function (response) {
                    onSuccess(response.data);
                })
                .catch(function (response) {
                    onError(response.data, response.status);
                });
        }

        return {
            iceCharts: function (success, error) {
                listByChartType("iceChart", success, error);
            },
            icebergs: function (success, error) {
                listByChartType("iceberg", success, error);
            },
            inshoreIceReport: function (success, error) {
                var messageId = embryo.messagePanel.show({
                    text: "Requesting inshore ice report ..."
                });

                function onSuccess(data) {
                    var count = data && data.observations ? Object.keys(data.observations).length : 0;

                    embryo.messagePanel.replace(messageId, {
                        text: "Inshore ice report with " + count + " observations downloaded.",
                        type: "success"
                    });
                    success(data);
                }

                function onError(data, status) {
                    var txt = "requesting inshore ice report";
                    var errorMsg = embryo.ErrorService.errorStatus(data, status, txt);
                    embryo.messagePanel.replace(messageId, {
                        text: errorMsg,
                        type: "error"
                    });
                    error(errorMsg, status);
                }

                $http.get(embryo.baseUrl + "rest/inshore-ice-report/provider/dmi", {
                    timeout: embryo.defaultTimeout
                })
                    .then(function (response) {
                        onSuccess(response.data);
                    })
                    .catch(function (response) {
                        onError(response.data, response.status);
                    });
            }
        };
    }

    embryo.ice = {
        delta: true,
        exponent: 3
    };

    module.run(function (IceService) {
        embryo.ice.service = IceService;
    });
})();
