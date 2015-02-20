/* Copyright (c) 2011 Danish Maritime Authority.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package dk.dma.embryo.dataformats.json;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.annotations.GZIP;
import org.jboss.resteasy.annotations.cache.NoCache;
import org.slf4j.Logger;

import dk.dma.embryo.common.json.AbstractRestService;
import dk.dma.embryo.dataformats.model.Forecast;
import dk.dma.embryo.dataformats.service.ForecastService;

@Path("/forecasts")
public class ForecastRestService extends AbstractRestService {
    
    @Inject
    private ForecastService forecastService;

    @Inject
    private Logger logger;

    @GET
    @Path("/ice")
    @Produces("application/json")
    @GZIP
    @NoCache
    public List<Forecast> listIcePrognoses() {
        logger.info("listIcePrognoses()");
        return forecastService.listAvailableIceForecasts();
    }

    @GET
    @Path("/ice/{id}")
    @Produces("application/json")
    @GZIP
    public Response getIcePrognosis(@PathParam(value = "id") long id, @Context Request request) {
        logger.info("getIcePrognosis({})", id);
        String data = forecastService.getForecast(id).getData();
        return super.getResponse(request, data, MAX_AGE_1_DAY);
    }

    @GET
    @Path("/waves")
    @Produces("application/json")
    @GZIP
    @NoCache
    public List<Forecast> listWavePrognoses() {
        logger.info("listWavePrognoses()");
        return forecastService.listAvailableWaveForecasts();
    }

    @GET
    @Path("/waves/{id}")
    @Produces("application/json")
    @GZIP
    public Response getWavePrognosis(@PathParam(value = "id") long id, @Context Request request) {
        logger.info("getWavePrognosis({})", id);
        String data = forecastService.getForecast(id).getData();
        return getResponse(request, data, MAX_AGE_1_DAY);
    }

    @GET
    @Path("/currents")
    @Produces("application/json")
    @GZIP
    @NoCache
    public List<Forecast> listCurrentPrognoses() {
        logger.info("listCurrentPrognoses()");
        return forecastService.listAvailableCurrentForecasts();
    }

    @GET
    @Path("/currents/{id}")
    @Produces("application/json")
    @GZIP
    public Response getCurrentPrognosis(@PathParam(value = "id") long id, @Context Request request) {
        logger.info("getCurrentPrognosis({})", id);
        
        String data = forecastService.getForecast(id).getData();
        return getResponse(request, data, MAX_AGE_1_DAY);
    }
}
