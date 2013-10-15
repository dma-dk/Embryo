function MetocLayer(color) {
    this.init = function() {
        var that = this;

        this.zoomLevels = [5, 7, 10];

        var context = {
            transparency : function() {
                return that.active ? 0.8 : 0.5;
            },
            offset : function(feature) {
                return -context.height(feature) / 2;
            },
            size : function() {
                return [0.5, 0.5, 1, 1][that.zoomLevel];
            },
            width : function(feature) {
                if (feature.attributes.type === 'wave') {
                    return context.size() * 27;
                }
                if (feature.attributes.type === 'current') {
                    return context.size() * 21;
                }
                if (feature.attributes.type === 'wind') {
                    return context.size() * 27;
                }
                return 100;
            },
            height : function(feature) {
                if (feature.attributes.type === 'wave') {
                    return context.size() * 93;
                }
                if (feature.attributes.type === 'current') {
                    return context.size() * 253;
                }
                if (feature.attributes.type === 'wind') {
                    return context.size() * 93;
                }
                return 100;
            },
            rotation : function(feature) {
                if (feature.attributes.type === 'wave') {
                    return feature.attributes.forecast.waveDir + 180;
                }
                if (feature.attributes.type === 'current') {
                    return feature.attributes.forecast.curDir + 180;
                }
                if (feature.attributes.type === 'wind') {
                    return feature.attributes.forecast.windDir;
                }
                return 0;
            },
            display : function(feature) {
                var modulus = feature.attributes.index % [ 20, 8, 4, 1 ][that.zoomLevel];
                if (modulus == 0) {
                    return "display";
                }
                return "none";
            },
            graphic : function(feature) {
                if (feature.attributes.type === 'wave') {
                    var waveHeight = feature.attributes.forecast.waveHeight;
                    var markerDir = 'img/wave/mark';

                    if (waveHeight >= 0 && waveHeight <= defaultWaveLow) {
                        markerDir += "01";
                    } else if (waveHeight > defaultWaveLow && waveHeight <= defaultWaveMedium) {
                        markerDir += "02";
                    } else if (waveHeight > defaultWaveMedium) {
                        markerDir += "03";
                    }

                    if (waveHeight >= defaultWaveWarnLimit) {
                        markerDir += "red.png";
                    } else {
                        markerDir += ".png";
                    }

                    return markerDir;
                }
                if (feature.attributes.type === 'current') {
                    var currentSpeedMs = feature.attributes.forecast.curSpeed;
                    var markerDir = 'img/current/mark';
                    var currentSpeedKn = currentSpeedMs * (3.6 / 1.852);

                    if (currentSpeedKn >= 0 && currentSpeedKn <= defaultCurrentLow) {
                        markerDir += "01";
                    } else if (currentSpeedKn > defaultCurrentLow && currentSpeedKn <= defaultCurrentMedium) {
                        markerDir += "02";
                    } else if (currentSpeedKn > defaultCurrentMedium) {
                        markerDir += "03";
                    }

                    if (currentSpeedKn >= defaultCurrentWarnLimit) {
                        markerDir += "red.png";
                    } else {
                        markerDir += ".png";
                    }

                    return markerDir;
                }
                if (feature.attributes.type === 'wind') {
                    var markerDir = 'img/wind/mark';
                    var windSpeed = feature.attributes.forecast.windSpeed;

                    var windSpeedKnots = windSpeed * (3.6 / 1.852);

                    if (windSpeedKnots >= 0 && windSpeedKnots <= 5) {
                        markerDir += "005";
                    } else if (windSpeedKnots > 5 && windSpeedKnots <= 10) {
                        markerDir += "010";
                    } else if (windSpeedKnots > 10 && windSpeedKnots <= 15) {
                        markerDir += "015";
                    } else if (windSpeedKnots > 15 && windSpeedKnots <= 20) {
                        markerDir += "020";
                    } else if (windSpeedKnots > 20 && windSpeedKnots <= 25) {
                        markerDir += "025";
                    } else if (windSpeedKnots > 25 && windSpeedKnots <= 30) {
                        markerDir += "030";
                    } else if (windSpeedKnots > 30 && windSpeedKnots <= 35) {
                        markerDir += "035";
                    } else if (windSpeedKnots > 35 && windSpeedKnots <= 40) {
                        markerDir += "040";
                    } else if (windSpeedKnots > 40 && windSpeedKnots <= 45) {
                        markerDir += "045";
                    } else if (windSpeedKnots > 45 && windSpeedKnots <= 50) {
                        markerDir += "050";
                    } else if (windSpeedKnots > 50 && windSpeedKnots <= 55) {
                        markerDir += "055";
                    } else if (windSpeedKnots > 55 && windSpeedKnots <= 60) {
                        markerDir += "060";
                    } else if (windSpeedKnots > 60 && windSpeedKnots <= 65) {
                        markerDir += "065";
                    } else if (windSpeedKnots > 65 && windSpeedKnots <= 70) {
                        markerDir += "070";
                    } else if (windSpeedKnots > 70 && windSpeedKnots <= 75) {
                        markerDir += "075";
                    } else if (windSpeedKnots > 75 && windSpeedKnots <= 80) {
                        markerDir += "080";
                    } else if (windSpeedKnots > 80 && windSpeedKnots <= 85) {
                        markerDir += "085";
                    } else if (windSpeedKnots > 85 && windSpeedKnots <= 90) {
                        markerDir += "090";
                    } else if (windSpeedKnots > 90 && windSpeedKnots <= 95) {
                        markerDir += "095";
                    } else if (windSpeedKnots > 95 && windSpeedKnots <= 100) {
                        markerDir += "100";
                    } else if (windSpeedKnots > 100 && windSpeedKnots <= 105) {
                        markerDir += "105";
                    } else if (windSpeedKnots > 100) {
                        markerDir += "105";
                    }

                    if (windSpeed >= defaultWindWarnLimit) {
                        markerDir += "red.png";
                    } else {
                        markerDir += ".png";
                    }

                    return markerDir;
                }
            }
        };

        this.layers.metoc = new OpenLayers.Layer.Vector("METOC", {
            styleMap : new OpenLayers.StyleMap({
                "default" : new OpenLayers.Style({
                    // graphicOpacity : "${transparency}",
                    externalGraphic : "${graphic}",
                    display : "${display}",
                    graphicWidth : "${width}",
                    graphicHeight : "${height}",
                    rotation : "${rotation}",
                }, {
                    context : context
                })
            })
        });

        var labelContext = {
            display : function(feature) {
                return that.zoomLevel >= 3 ? "display" : "none";
            },
        };
        this.layers.labels = new OpenLayers.Layer.Vector(
            "metocLabels", {
                styleMap : new OpenLayers.StyleMap( {
                    'default' : new OpenLayers.Style( {
                            label : "Time: ${time}\nCurrent: ${curSpeed} - ${curDir} \nWind:   ${windSpeed} - ${windDir} \nWave: ${waveHeight} - ${waveDir} (${wavePeriod})\nSea level:   ${sealevel}",
                            fontColor : timeStampColor,
                            fontSize : 10,
                            fontFamily : timeStampFontFamily,
                            labelAlign : "${align}",
                            labelXOffset : "${xOffset}",
                            labelYOffset : "${yOffset}",
                            pointRadius : 3,
                            fill : true,
                            fillColor : '#550055',
                            strokeColor : pastTrackColor,
                            stroke : true,
                            display : "${display}"
                        }, {
                            context : labelContext
                        }
                    )
                })
            }
        );

    }
    this.draw = function(metoc) {
        this.layers.metoc.removeAllFeatures();

        var index, attr, geom, forecast, features = [], labelFeatures = [];

        for (index in metoc.forecasts) {
            forecast = metoc.forecasts[index];
            var featuresCount = features.length;

            if (forecast.waveDir && forecast.waveHeight && forecast.wavePeriod) {
                attr = {
                    index : index,
                    type : "wave",
                    created : metoc.created,
                    forecast : forecast
                };
                geom = embryo.map.createPoint(forecast.lon, forecast.lat);
                features.push(new OpenLayers.Feature.Vector(geom, attr));
            }
            if (forecast.windDir && forecast.windSpeed) {
                attr = {
                    index : index,
                    type : "wind",
                    created : metoc.created,
                    forecast : forecast
                };
                geom = embryo.map.createPoint(forecast.lon, forecast.lat);
                features.push(new OpenLayers.Feature.Vector(geom, attr));
            }
            if (forecast.curDir && forecast.curSpeed) {
                attr = {
                    index : index,
                    type : "current",
                    created : metoc.created,
                    forecast : forecast
                };
                geom = embryo.map.createPoint(forecast.lon, forecast.lat);
                features.push(new OpenLayers.Feature.Vector(geom, attr));
            }


            if (featuresCount < features.length) {
                attr = {
                    time : formatTime(forecast.time),
                    curSpeed : forecast.curSpeed ? forecast.curSpeed + " kn" : "N/A",
                    curDir : forecast.curDir ? forecast.curDir + "°" : "N/A",
                    windSpeed : forecast.windSpeed ? forecast.windSpeed + " m/s" : "N/A",
                    windDir : forecast.windDir ? forecast.windDir + "°" : "N/A",
                    waveHeight : forecast.waveHeight ? forecast.waveHeight + " m" : "N/A",
                    waveDir : forecast.waveDir ? forecast.waveDir + "°" : "N/A",
                    wavePeriod : forecast.wavePeriod ? forecast.wavePeriod + " sec" : "N/A",
                    sealevel : forecast.sealevel ? forecast.sealevel + " m" : "N/A",
                    align : "lm",
                    xOffset : 40,
                    yOffset : 40
                };
                labelFeatures.push(new OpenLayers.Feature.Vector(embryo.map.createPoint(forecast.lon, forecast.lat), attr));
            }
        }

        this.layers.metoc.addFeatures(features);
        this.layers.metoc.refresh();

        this.layers.labels.addFeatures(labelFeatures);
        this.layers.labels.refresh();

        console.log("features", features)
    }
}

MetocLayer.prototype = new EmbryoLayer();