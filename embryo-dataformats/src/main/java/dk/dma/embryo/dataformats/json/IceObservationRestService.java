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
import org.slf4j.Logger;

import dk.dma.embryo.common.json.AbstractRestService;
import dk.dma.embryo.dataformats.model.IceObservation;
import dk.dma.embryo.dataformats.service.IceObservationService;

@Path("/ice")
public class IceObservationRestService extends AbstractRestService {
    @Inject
    private IceObservationService iceObservationService;

    @Inject
    private Logger logger;
    
    @GET
    @Path("/provider/list")
    @Produces("application/json")
    @GZIP
    public Response listIceChartProviders(@Context Request request) {
        logger.info("listIceChartProviders()");
        return super.getResponse(request, iceObservationService.listIceChartProviders(), NO_CACHE);
    }

    @GET
    @Path("/{charttype}/observations")
    @Produces("application/json")
    @GZIP
    public Response listIceObservations(@Context Request request, @PathParam("charttype") String chartType) {
        logger.info("listIceObservations({})", chartType);

        List<IceObservation> result = iceObservationService.listAvailableIceObservations(chartType);
        logger.info("listIceObservations({}) : ", chartType, result);
        return super.getResponse(request, result, NO_CACHE);
    }

}
