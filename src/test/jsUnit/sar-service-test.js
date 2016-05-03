describe('embryo.sar', function () {


    function createSarInputTestObject(service) {
        var searchObjectTypes = service.searchObjectTypes();
        return {
            sarNo: 1,
            type: embryo.sar.Operation.RapidResponse,
            lastKnownPosition: {
                ts: Date.now() - 60 * 60 * 1000,
                lon: "051 00.000W",
                lat: "61 00.000N"
            },
            startTs: Date.now(),
            surfaceDriftPoints: [{
                ts: Date.now() - 60 * 60 * 1000,
                twcSpeed: 5,
                twcDirection: 45,
                leewaySpeed: 15,
                leewayDirection: 30
            }],
            xError: 1,
            yError: 0.1,
            safetyFactor: 1,
            searchObject: searchObjectTypes[0].id
        }
    }

    function createTestRdv(increment){
        return {
            direction: 6 + increment,
            distance: 5 + increment,
            speed: 5 + increment
        }
    }
    function createTestDatum(increment){
        return {
            lon: -58 + increment,
            lat: 62 + increment
        }
    }
    function createCoordinator(name){
        return {
            name: name,
            _id: 62
        }
    }

    function createSarOutputTestObject(type) {
        var output = {
            searchArea: {
                A: {
                    lon: -57,
                    lat: 63
                },
                B: {
                    lon: -57,
                    lat: 61
                },
                C: {
                    lon: -59,
                    lat: 61
                },
                D: {
                    lon: -59,
                    lat: 63
                }
            }
        }

        if(type === embryo.sar.Operation.RapidResponse){
            output.radius = 2;
            output.datum = createTestDatum(0);
            output.rdv = createTestRdv(0);
        } else if (type === embryo.sar.Operation.DatumPoint){
            output.downWind = {
                radius: 2,
                datum: createTestDatum(1),
                rdv: createTestRdv(1)
            };
            output.max = {
                radius: 3,
                datum: createTestDatum(2),
                rdv: createTestRdv(2)
            };
            output.min = {
                radius: 1,
                datum: createTestDatum(0),
                rdv: createTestRdv(0)
            }
        }
        return output;
    }

    function createSarTestObject(service, user, operationType) {
        var sar = {
            coordinator: createCoordinator(user),
            input: createSarInputTestObject(service),
            output: createSarOutputTestObject(operationType)
        }

        sar['@type'] = embryo.sar.Type.SearchArea;
        return sar;
    }

    describe('SarService', function () {
        var service;
        beforeEach(function () {
            var mockSubject = {
                getDetails: function () {
                    return {
                        userName: "foo"
                    };
                }
            };

            module('embryo.authentication.service', function ($provide) {
                $provide.value('Subject', mockSubject);
            });
            module('embryo.sar.service');
        });

        beforeEach(inject(function (SarService) {
            service = SarService;
        }));

        /**
         * This unit test has been produced to ensure the same result as when calculating rapid response SAR operations in the EPD project.
         * The unit test was first written in Java in the EPD project, just making assertion values fit what was actually calculated, and then
         * there after ported to JavaScript. This way it is ensured that the JavaScript SAR calculations at least behaves the same as the Java
         * version did at the time of the SAR operations was implemented.
         *
         * Produced SAR unit test: https://github.com/dma-enav/EPD/blob/master/epd-common/src/test/java/dk/dma/epd/common/prototype/model/voct/SarOperationTest.java
         * as testRapidResponseWithOneSurfarceDriftPoint()
         */
        it('create rapid response SAR operation with one surface drift point', function () {
            var input = createSarInputTestObject(service);

            //var sarOperation = null;
            var result = service.createSarOperation(input);

            expect(result).toBeDefined();
            expect(result.output).toBeDefined();
            var output = result.output;

            // ASSERT DATUM
            expect(output.datum.lon).toBe("050 52.939W");
            expect(output.datum.lat).toBe("61 03.328N");

            expect(output.rdv.direction).toBeCloseTo(45.780030, 4);
            expect(output.rdv.distance).toBeCloseTo(4.775445, 4);
            expect(output.rdv.speed).toBeCloseTo(4.775445, 4);
            expect(output.radius).toBeCloseTo(2.532634, 4);

            expect(output.searchArea.A.lat).toBe("61 06.905N");
            expect(output.searchArea.A.lon).toBe("050 52.842W");

            expect(output.searchArea.B.lat).toBe("61 03.278N");
            expect(output.searchArea.B.lon).toBe("050 45.541W");

            expect(output.searchArea.C.lat).toBe("60 59.748N");
            expect(output.searchArea.C.lon).toBe("050 53.043W");

            expect(output.searchArea.D.lat).toBe("61 03.375N");
            expect(output.searchArea.D.lon).toBe("051 00.331W");
            expect(output.searchArea.size).toBeCloseTo(2.5326335063948107 * 2.5326335063948107 * 4, 4);
        });


        /**
         * This unit test has been produced to ensure the same result as when calculating rapid response SAR operations in the EPD project.
         * The unit test was first written in Java in the EPD project, just making assertion values fit what was actually calculated, and then
         * there after ported to JavaScript. This way it is ensured that the JavaScript SAR calculations at least behaves the same as the Java
         * version did at the time of the SAR operations was implemented.
         *
         * Produced SAR unit test: https://github.com/dma-enav/EPD/blob/master/epd-common/src/test/java/dk/dma/epd/common/prototype/model/voct/SarOperationTest.java
         * as testRapidResponseWithTwoSurfarceDriftPoint()
         */

        it('create rapid response SAR operation with two surface drift points', function () {
            var searchObjectTypes = service.searchObjectTypes();

            var input = {
                sarNo: 1,
                type: embryo.sar.Operation.RapidResponse,
                lastKnownPosition: {
                    ts: Date.now() - 60 * 60 * 1000,
                    lon: -51,
                    lat: 61
                },
                startTs: Date.now(),
                surfaceDriftPoints: [{
                    ts: Date.now() - 60 * 60 * 1000,
                    twcSpeed: 5,
                    twcDirection: 45,
                    leewaySpeed: 15,
                    leewayDirection: 30
                }, {
                    ts: Date.now() - 30 * 60 * 1000,
                    twcSpeed: 8,
                    twcDirection: 35,
                    leewaySpeed: 10,
                    leewayDirection: 20
                }],
                xError: 0.1,
                yError: 0.1,
                safetyFactor: 1,
                searchObject: searchObjectTypes[0].id
            }

            //var sarOperation = null;
            var result = service.createSarOperation(input);

            expect(result).toBeDefined();
            expect(result.output).toBeDefined();
            var output = result.output;

            // ASSERT DATUM
            expect(output.datum.lat).toBe("61 04.854N");
            expect(output.datum.lon).toBe("050 51.794W");

            expect(output.rdv.direction).toBeCloseTo(35.372815, 4);
            expect(output.rdv.distance).toBeCloseTo(3.914134, 4);
            expect(output.rdv.speed).toBeCloseTo(7.828269, 4);
            expect(output.radius).toBeCloseTo(1.374240, 4);

            expect(output.searchArea.A.lat).toBe("61 06.769N");
            expect(output.searchArea.A.lon).toBe("050 52.467W");

            expect(output.searchArea.B.lat).toBe("61 05.179N");
            expect(output.searchArea.B.lon).toBe("050 47.833W");

            expect(output.searchArea.C.lat).toBe("61 02.939N");
            expect(output.searchArea.C.lon).toBe("050 51.124W");

            expect(output.searchArea.D.lat).toBe("61 04.529N");
            expect(output.searchArea.D.lon).toBe("050 55.753W");
            expect(output.searchArea.size).toBeCloseTo(1.3742403439070814 * 1.3742403439070814 * 4, 4);
        });

        function executeWithTryCatch(service, input) {
            try {
                service.createSarOperation(input);
            } catch (Error) {
                return Error;
            }
            return null;
        }

        function assertErrorContent(err, fieldName) {
            expect(err).toBeDefined();
            expect(err.message).toBeDefined();
            expect(err.message.indexOf(fieldName) >= 0).toBe(true);
        }

        it('Error thrown if lastKnownPosition.ts has no value', function () {
            var input = createSarInputTestObject(service);
            input.lastKnownPosition.ts = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "ts");
        });

        it('Error thrown if lastKnownPosition.lon has no value', function () {
            var input = createSarInputTestObject(service);
            input.lastKnownPosition.lon = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "lon");
        });

        it('Error thrown if lastKnownPosition.lat has no value', function () {
            var input = createSarInputTestObject(service);
            input.lastKnownPosition.lat = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "lat");
        });

        it('Error thrown if startTs has no value ', function () {
            var input = createSarInputTestObject(service);
            input.startTs = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "startTs");
        });

        it('Error thrown if surfaceDriftPoint.ts has no value ', function () {
            var input = createSarInputTestObject(service);
            input.surfaceDriftPoints[0].ts = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "ts");
        });

        it('Error thrown if surfaceDriftPoint.twcSpeed has no value ', function () {
            var input = createSarInputTestObject(service);
            input.surfaceDriftPoints[0].twcSpeed = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "twcSpeed");
        });

        it('Error thrown if surfaceDriftPoint.twcDirection has no value ', function () {
            var input = createSarInputTestObject(service);
            input.surfaceDriftPoints[0].twcDirection = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "twcDirection");
        });

        it('Error thrown if surfaceDriftPoint.leewaySpeed has no value ', function () {
            var input = createSarInputTestObject(service);
            input.surfaceDriftPoints[0].leewaySpeed = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "leewaySpeed");
        });

        it('Error thrown if surfaceDriftPoint.leewayDirection has no value ', function () {
            var input = createSarInputTestObject(service);
            input.surfaceDriftPoints[0].leewayDirection = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "leewayDirection");
        });

        it('Error thrown if xError has no value ', function () {
            var input = createSarInputTestObject(service);
            input.xError = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "xError");
        });

        it('Error thrown if yError has no value ', function () {
            var input = createSarInputTestObject(service);
            input.yError = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "yError");
        });

        it('Error thrown if safetyFactor has no value ', function () {
            var input = createSarInputTestObject(service);
            input.safetyFactor = null;

            var err = executeWithTryCatch(service, input)
            assertErrorContent(err, "safetyFactor");
        });


        /**
         * This unit test has been produced to ensure the same result as when calculating rapid response SAR operations in the EPD project.
         * The unit test was first written in Java in the EPD project, just making assertion values fit what was actually calculated, and then
         * there after ported to JavaScript. This way it is ensured that the JavaScript SAR calculations at least behaves the same as the Java
         * version did at the time of the SAR operations was implemented.
         *
         * Produced SAR unit test: https://github.com/dma-enav/EPD/blob/master/epd-common/src/test/java/dk/dma/epd/common/prototype/model/voct/SarOperationTest.java
         * as testRapidResponseWithTwoSurfarceDriftPoint()
         */

        it('create datum point SAR operation with one surface drift point', function () {
            var searchObjectTypes = service.searchObjectTypes();

            var input = {
                sarNo: 1,
                type: embryo.sar.Operation.DatumPoint,
                lastKnownPosition: {
                    ts: Date.now() - 60 * 60 * 1000,
                    lat: 61,
                    lon: -51
                },
                startTs: Date.now(),
                surfaceDriftPoints: [{
                    ts: Date.now() - 60 * 60 * 1000,
                    twcSpeed: 5,
                    twcDirection: 45,
                    leewaySpeed: 15,
                    leewayDirection: 30
                }],
                xError: 1.0,
                yError: 0.1,
                safetyFactor: 1.0,
                searchObject: searchObjectTypes[0].id
            }

            //var sarOperation = null;
            var result = service.createSarOperation(input);

            expect(result).toBeDefined();
            expect(result.output).toBeDefined();
            var output = result.output;

            // ASSERT DATUM
            expect(output.downWind.datum.lat).toBe("61 03.328N");
            expect(output.downWind.datum.lon).toBe("050 52.939W");
            expect(output.downWind.rdv.direction).toBeCloseTo(45.780030, 4);
            expect(output.downWind.rdv.distance).toBeCloseTo(4.7754450, 4);
            expect(output.downWind.rdv.speed).toBeCloseTo(4.775445, 4);
            expect(output.downWind.radius).toBeCloseTo(2.532633, 4);

            expect(output.max.datum.lat).toBe("61 03.413N");
            expect(output.max.datum.lon).toBe("050 53.115W");
            expect(output.max.rdv.direction).toBeCloseTo(44.331598, 4);
            expect(output.max.rdv.distance).toBeCloseTo(4.7752103, 4);
            expect(output.max.rdv.speed).toBeCloseTo(4.7752103, 4);
            expect(output.max.radius).toBeCloseTo(2.5325631, 4);

            expect(output.min.datum.lat).toBe("61 03.297N");
            expect(output.min.datum.lon).toBe("050 52.699W");
            expect(output.min.rdv.direction).toBeCloseTo(47.008245, 4);
            expect(output.min.rdv.distance).toBeCloseTo(4.8383743, 4);
            expect(output.min.rdv.speed).toBeCloseTo(4.8383743, 4);
            expect(output.min.radius).toBeCloseTo(2.5515123, 4);

            /*
             expect(formatLatitude(sarOperation.searchArea.A.lat)).toBe("60 59.801N");
             expect(formatLongitude(sarOperation.searchArea.A.lon)).toBe("050 50.788W");

             expect(formatLatitude(sarOperation.searchArea.B.lat)).toBe("61 02.460N");
             expect(formatLongitude(sarOperation.searchArea.B.lon)).toBe("051 00.292W");

             expect(formatLatitude(sarOperation.searchArea.C.lat)).toBe("61 06.878N");
             expect(formatLongitude(sarOperation.searchArea.C.lon)).toBe("050 55.017W");

             expect(formatLatitude(sarOperation.searchArea.D.lat)).toBe("61 04.229N");
             expect(formatLongitude(sarOperation.searchArea.D.lon)).toBe("050 45.497W");
             expect(sarOperation.searchArea.size).toBeCloseTo(1.3742403439070814 * 1.3742403439070814 * 4, 4);
             */
        });


        it('prepareSearchAreaForDisplayal removes datum and RDV if user is not coordinator', function () {
            var searchArea = createSarTestObject(service, "Coordinator", embryo.sar.Operation.RapidResponse)

            var result = service.prepareSearchAreaForDisplayal(searchArea);

            expect(result).toBeDefined();
            expect(result.output).toBeDefined();
            expect(result.output.searchArea).toBeDefined();
            expect(result.output.datum).toBeUndefined();
            expect(result.output.radius).toBeUndefined();
            expect(result.output.rdv).toBeUndefined();
        });

        it('prepareSearchAreaForDisplayal removes downWind, min and max if user is not coordinator', function () {
            var searchArea = createSarTestObject(service, "Coordinator", embryo.sar.Operation.DatumPoint)

            var result = service.prepareSearchAreaForDisplayal(searchArea);

            expect(result).toBeDefined();
            expect(result.output).toBeDefined();
            expect(result.output.searchArea).toBeDefined();
            expect(result.output.downWind).toBeUndefined();
            expect(result.output.min).toBeUndefined();
            expect(result.output.max).toBeUndefined();
        });

        it('setUserAsCoordinator', function () {
            var sarOperation = createSarTestObject(service, "Coordinator", embryo.sar.Operation.DatumPoint)

            var user = {
                _id: 34,
                _rev: 134567,
                name : "JohnDoe",
                mmsi : 123456789
            }
            user['class'] = 'test.User'

            var result = service.setUserAsCoordinator(sarOperation, user);

            expect(result).toBeDefined();
            expect(result.coordinator).toBeDefined();
            expect(result.coordinator._id).toBe(34);
            expect(result.coordinator.name).toBe("JohnDoe");
            expect(result.coordinator.mmsi).toBe(123456789);
            expect(result.coordinator._rev).toBeUndefined();
            expect(result.coordinator['@class']).toBeUndefined();
        });
    });

    describe('SarService.prepareSearchAreaForDisplayal - failing', function () {
        beforeEach(function () {
            var mockSubject = {
                getDetails: function () {
                    return {
                        userName: "Coordinator"
                    };
                }
            };

            module('embryo.authentication.service', function ($provide) {
                $provide.value('Subject', mockSubject);
            });
            module('embryo.sar.service');
        });

        beforeEach(inject(function (SarService) {
            service = SarService;
        }));

        it('prepareSearchAreaForDisplayal maintains datum and RDV if user is coordinator', function () {
            var searchArea = createSarTestObject(service, "Coordinator", embryo.sar.Operation.RapidResponse)

            var result = service.prepareSearchAreaForDisplayal(searchArea);

            expect(result).toBeDefined();
            expect(result.output).toBeDefined();
            expect(result.output.searchArea).toBeDefined();
            expect(result.output.datum).toBeDefined();
            expect(result.output.radius).toBeDefined();
            expect(result.output.rdv).toBeDefined();
        });

        it('prepareSearchAreaForDisplayal maintains downWind, min and max if user is coordinator', function () {
            var searchArea = createSarTestObject(service, "Coordinator", embryo.sar.Operation.DatumPoint)

            var result = service.prepareSearchAreaForDisplayal(searchArea);

            expect(result).toBeDefined();
            expect(result.output).toBeDefined();
            expect(result.output.searchArea).toBeDefined();
            expect(result.output.downWind).toBeDefined();
            expect(result.output.min).toBeDefined();
            expect(result.output.max).toBeDefined();
        });

    });
});