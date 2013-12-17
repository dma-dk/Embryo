/* Copyright (c) 2011 Danish Maritime Authority
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this library.  If not, see <http://www.gnu.org/licenses/>.
 */
package dk.dma.arcticweb.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import org.jboss.resteasy.annotations.GZIP;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.slf4j.Logger;

import dk.dma.arcticweb.service.GreenPosService;
import dk.dma.embryo.domain.GreenPosReport;
import dk.dma.embryo.domain.GreenposMinimal;
import dk.dma.embryo.domain.GreenposSearch;
import dk.dma.embryo.rest.json.GreenPos;
import dk.dma.embryo.rest.json.GreenPosShort;
import dk.dma.embryo.rest.util.DateTimeConverter;

/**
 * 
 * @author Jesper Tejlgaard
 */
@Path("/greenpos")
public class GreenPosRestService {

    @Inject
    private GreenPosService reportingService;

    @Inject
    private Logger logger;

    public GreenPosRestService() {
    }

    @POST
    @Consumes("application/json")
    public void save(GreenPos report) {
        logger.debug("save({})", report);

        GreenPosReport toBeSaved = GreenPosReport.from(report);

        reportingService.saveReport(toBeSaved);
        // String result = "Product created : " + product;
        // return Response.status(201).entity(result).build();
        logger.debug("save() - done", report);
    }

    @GET
    @Path("/latest/{mmsi}")
    @Produces("application/json")
    @GZIP
    public GreenPos latest(@PathParam("mmsi") Long mmsi) {
        logger.debug("latest({})", mmsi);

        GreenPos result = null;

        GreenPosReport report = reportingService.getLatest(mmsi);

        if (report != null) {
            result = report.toJsonModel();
        }

        logger.debug("latest({}) - {}", mmsi, result);

        return result;
    }

    @GET
    @Path("/latest")
    @Produces("application/json")
    @GZIP
    public List<GreenposMinimal> listLatest() {
        logger.debug("listLatest()");

        List<GreenposMinimal> reports = reportingService.getLatest();

        logger.debug("listLatest() - {}", reports);

        return reports;
    }

    
    @GET
    @Path("/{id}")
    @Produces("application/json")
    @GZIP
    public GreenPos get(@PathParam("id") String id) {
        logger.debug("get({})", id);

        GreenPosReport report = reportingService.get(id);

        GreenPos result = report.toJsonModel();

        logger.debug("get() - {}", result);
        return result;
    }

    @GET
    @Path("/list")
    @Produces("application/json")
    @GZIP
    public GreenPosShort[] list(@QueryParam("type") String type, @QueryParam("mmsi") Long mmsi,
            @QueryParam("ts") String ts, @QueryParam("sortBy") String sortBy,
            @QueryParam("sortOrder") String sortOrder, @QueryParam("start") Integer start,
            @QueryParam("max") Integer max) {
        logger.debug("list({})");

        DateTime dateTime = null;
        if (ts != null && ts.trim().length() > 0) {
            try {
                long lts = Long.parseLong(ts);
                dateTime = new DateTime(lts, DateTimeZone.UTC);
            } catch (NumberFormatException e) {
                dateTime = DateTimeConverter.getDateTimeConverter().toObject(ts);
            }
        }

        GreenposSearch search = new GreenposSearch(type, mmsi, dateTime, sortBy, sortOrder, start, max);

        logger.debug("Searching with {}", search);

        List<GreenPosReport> reports = reportingService.findReports(search);

        GreenPosShort[] result = GreenPosReport.toJsonModelShort(reports);

        logger.debug("list() - {}", (Object[]) result);
        return result;
    }
}
