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
package dk.dma.embryo.dataformats.inshore;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.EntityTag;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.jboss.resteasy.annotations.GZIP;
import org.slf4j.Logger;

@Path("/inshore-ice-report")
public class InshoreIceReportJsonService {

    @Inject
    private InshoreIceReportService iceInformationService;

    @Inject
    private Logger logger;

    @GET
    @Path("/provider/{provider}")
    @Produces("application/json")
    @GZIP
    public Response inshoreIceReport(@PathParam("provider") String providerKey, @Context Request request) {
        logger.debug("iceInformations({})", providerKey);

        CacheControl cc = getCacheControl();

        InshoreIceReportMerged report = iceInformationService.getInshoreIceReportsMerged(providerKey);

        // sending status code 204
        if(report == null){
            ResponseBuilder builder = Response.noContent();
            builder.cacheControl(cc);
            return builder.build();
        }
        
        EntityTag etag = new EntityTag(Integer.toString(report.hashCode()));
        ResponseBuilder builder = request.evaluatePreconditions(etag);

        // cached resource did change -> serve updated content
        if (builder == null) {
            builder = Response.ok(report);
        }
        builder.cacheControl(cc);
        builder.tag(etag);
        
        Response response = builder.build();
        return response;

    }

    private CacheControl getCacheControl() {
        CacheControl cc = new CacheControl();
        // If resource is younger than max age, then the browser will always use cache version. 
        // IF resource is older than max age, then a request is sent to the server. 304 may then be returned in case the resource is unmodified.  
        // 15 minutes chosen because vessels should be able to provoke a refresh, if they know a new report is available 
        cc.setMaxAge(60 * 15);
        cc.setPrivate(false);
        cc.setNoTransform(false);
        return cc;
    }

}
