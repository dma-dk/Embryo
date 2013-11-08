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
package dk.dma.embryo.rest;

import dk.dma.arcticweb.dao.VesselDao;
import dk.dma.arcticweb.service.AisReplicatorService;
import dk.dma.arcticweb.service.ScheduleService;
import dk.dma.arcticweb.service.VesselService;
import dk.dma.embryo.domain.ParseUtils;
import dk.dma.embryo.domain.Route;
import dk.dma.embryo.domain.Vessel;
import dk.dma.embryo.rest.json.VesselDetails;
import dk.dma.embryo.rest.json.VesselDetails.AdditionalInformation;
import dk.dma.embryo.rest.json.VesselOverview;
import dk.dma.embryo.restclients.FullAisViewService;
import dk.dma.embryo.restclients.LimitedAisViewService;
import org.jboss.resteasy.annotations.GZIP;
import org.slf4j.Logger;

import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/vessel")
public class VesselRestService {
    @Inject
    private LimitedAisViewService limitedAisViewService;

    @Inject
    private FullAisViewService fullAisViewService;

    @Inject
    private AisReplicatorService aisReplicator;

    @Inject
    private Logger logger;

    @Inject
    private VesselService vesselService;

    @Inject
    private ScheduleService scheduleService;

    @Inject
    private VesselDao vesselDao;

    @GET
    @Path("/historical-track")
    @Produces("application/json")
    @GZIP
    public Object historicalTrack(@QueryParam("mmsi") long mmsi) {
        Map result = limitedAisViewService.vesselTargetDetails(mmsi, 1);
        return ((Map) result.get("pastTrack")).get("points");
    }

    @GET
    @Path("/list")
    @Produces("application/json")
    @GZIP
    public List<VesselOverview> list() {
        List<VesselOverview> result = new ArrayList<>();

        List<String[]> vessels = aisReplicator.getVesselsInArcticCircle();

        for (String[] vessel : vessels) {

            VesselOverview vo = new VesselOverview();

            vo.setX(Double.parseDouble(vessel[2]));
            vo.setY(Double.parseDouble(vessel[1]));
            vo.setAngle(Double.parseDouble(vessel[0]));
            vo.setMmsi(Long.parseLong(vessel[6]));
            vo.setName(vessel[7]);
            vo.setImo(vessel[9]);
            vo.setCallSign(vessel[8]);
            vo.setMoored("1".equals(vessel[5]));
            vo.setType(vessel[4]);
            vo.setInArcticWeb(false);

            // What is vessel[3] seems to be either A or B ?

            result.add(vo);
        }

        Map<Long, VesselOverview> resultAsMap = new HashMap<>();

        for (VesselOverview vo : result) {
            resultAsMap.put(vo.getMmsi(), vo);
        }

        List<Vessel> allArcticWebVessels = vesselDao.getAll(Vessel.class);

        for (Vessel v : allArcticWebVessels) {
            VesselOverview vesselOverview = resultAsMap.get(v.getMmsi());

            if (vesselOverview != null) {
                vesselOverview.setInArcticWeb(true);
            } else {
                VesselOverview vo = new VesselOverview();
                vo.setInArcticWeb(true);
                vo.setCallSign(v.getAisData().getCallsign());
                vo.setName(v.getAisData().getName());
                vo.setImo("" + v.getAisData().getImoNo());
                vo.setMmsi(v.getMmsi());
                result.add(vo);
            }
        }

        return result;
    }

    @GET
    @Path("/details")
    @Produces("application/json")
    @GZIP
    public VesselDetails details(@QueryParam("mmsi") long mmsi) {
        try {
            Map result = fullAisViewService.vesselTargetDetails(mmsi, 0);

            boolean historicalTrack =
                    aisReplicator.isWithinAisCircle(ParseUtils.parseLongitude((String) result.get("lon")),
                            ParseUtils.parseLatitude((String) result.get("lat")));

            VesselDetails details;
            Vessel vessel = vesselService.getVessel(mmsi);

            Route route = null;

            if (vessel != null) {
                route = scheduleService.getActiveRoute(mmsi);
                details = vessel.toJsonModel();
                details.getAis().putAll(result);
            } else {
                details = new VesselDetails();
                details.setAis(result);
            }

            details.setAdditionalInformation(
                    new AdditionalInformation(
                            route != null ? route.getEnavId() : null, historicalTrack
                    )
            );

            return details;

        } catch (Throwable t) {
            logger.info("Ignoring exception " + t, t);

            // fallback on database only

            Vessel vessel = vesselService.getVessel(mmsi);


            if (vessel != null) {
                VesselDetails details;
                Route route = scheduleService.getActiveRoute(mmsi);
                details = vessel.toJsonModel();

                details.getAis().put("callsign", vessel.getAisData().getCallsign());
                details.getAis().put("imoNo", "" + vessel.getAisData().getImoNo());
                details.getAis().put("mmsi", "" + vessel.getMmsi());
                details.getAis().put("name", "" + vessel.getAisData().getName());

                details.setAdditionalInformation(
                        new AdditionalInformation(
                                route != null ? route.getEnavId() : null, false
                        )
                );

                return details;
            } else {
                throw new RuntimeException("No vessel details available for " + mmsi + " caused by " + t);
            }
        }
    }

    @POST
    @Path("/save-details")
    @Consumes("application/json")
    @GZIP
    public void saveDetails(VesselDetails details) {
        logger.info("save({})", details);
        vesselService.save(Vessel.fromJsonModel(details));
    }
}
