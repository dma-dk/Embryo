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
package dk.dma.embryo.vessel.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import org.jboss.resteasy.annotations.GZIP;
import org.jboss.resteasy.annotations.cache.NoCache;
import org.slf4j.Logger;

import dk.dma.embryo.common.util.ParseUtils;
import dk.dma.embryo.vessel.job.AisDataService;
import dk.dma.embryo.vessel.job.AisReplicatorJob;
import dk.dma.embryo.vessel.job.MaxSpeedJob;
import dk.dma.embryo.vessel.job.MaxSpeedJob.MaxSpeedRecording;
import dk.dma.embryo.vessel.json.client.FullAisViewService;
import dk.dma.embryo.vessel.json.client.LimitedAisViewService;
import dk.dma.embryo.vessel.model.Route;
import dk.dma.embryo.vessel.model.Vessel;
import dk.dma.embryo.vessel.model.Voyage;
import dk.dma.embryo.vessel.persistence.VesselDao;
import dk.dma.embryo.vessel.service.ScheduleService;
import dk.dma.embryo.vessel.service.VesselService;

@Path("/vessel")
@RequestScoped
public class VesselRestService {
    @Inject
    private LimitedAisViewService limitedAisViewService;

    @Inject
    private FullAisViewService fullAisViewService;

    @Inject
    private AisDataService aisDataService;

    @Inject
    private Logger logger;

    @Inject
    private VesselService vesselService;

    @Inject
    private ScheduleService scheduleService;

    @Inject
    private VesselDao vesselDao;

    @Inject
    private MaxSpeedJob maxSpeedJob;

    @Inject
    private AisReplicatorJob aisReplicatorJob;

    @GET
    @Path("/historical-track")
    @Produces("application/json")
    @GZIP
    @NoCache
    public Object historicalTrack(@QueryParam("mmsi") long mmsi) {
        Map<String, Object> result = limitedAisViewService.vesselTargetDetails(mmsi, 1);
        return ((Map) result.get("pastTrack")).get("points");
    }

    @GET
    @Path("/list")
    @Produces("application/json")
    @GZIP
    @NoCache
    public List<VesselOverview> list() {
        List<VesselOverview> result = new ArrayList<>();

        List<String[]> vessels = aisDataService.getVesselsOnMap();

        Map<Long, MaxSpeedRecording> speeds = aisDataService.getMaxSpeeds();

        for (String[] vessel : vessels) {

            VesselOverview vo = new VesselOverview();
            Long mmsi = Long.valueOf(vessel[6]);

            vo.setX(Double.parseDouble(vessel[2]));
            vo.setY(Double.parseDouble(vessel[1]));
            vo.setAngle(Double.parseDouble(vessel[0]));
            vo.setMmsi(mmsi);
            vo.setName(vessel[7]);
            vo.setCallSign(vessel[8]);
            vo.setMoored("1".equals(vessel[5]));
            vo.setType(vessel[4]);
            vo.setInAW(false);

            // What is vessel[3] seems to be either A or B ?

            MaxSpeedRecording speed = speeds.get(mmsi);
            vo.setMsog(speed != null ? speed.getMaxSpeed() : 0.0);

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
                vesselOverview.setInAW(true);
            } else {
                VesselOverview vo = new VesselOverview();
                vo.setInAW(true);
                vo.setCallSign(v.getAisData().getCallsign());
                vo.setName(v.getAisData().getName());
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
    @NoCache
    @Details
    public VesselDetails details(@QueryParam("mmsi") long mmsi) {
        logger.debug("details({})", mmsi);

        try {
            Map<String, Object> result = fullAisViewService.vesselTargetDetails(mmsi, 0);

            boolean historicalTrack = false;
            String lat = (String) result.get("lat");
            String lon = (String) result.get("lon");
            // EMBRYO-135: avoid NullPointer when lat/lon not present in AIS data
            if (lat != null && lon != null) {
                historicalTrack = aisDataService.isWithinAisCircle(ParseUtils.parseLongitude(lon),
                        ParseUtils.parseLatitude(lat));
            }

            VesselDetails details;
            Vessel vessel = vesselService.getVessel(mmsi);
            List<Voyage> schedule = null;
            Route route = null;

            if (vessel != null) {
                route = scheduleService.getActiveRoute(mmsi);
                details = vessel.toJsonModel();
                schedule = scheduleService.getSchedule(mmsi);
                details.getAis().putAll(result);
            } else {
                details = new VesselDetails();
                details.setAis(result);
            }

            // Map<String, Object> reporting = new HashMap<>();
            // details.setReporting(reporting);

            Map<String, Object> additionalInformation = new HashMap<>();
            additionalInformation.put("historicalTrack", historicalTrack);
            additionalInformation.put("routeId", route != null ? route.getEnavId() : null);
            additionalInformation.put("schedule", schedule != null && schedule.size() > 0);

            details.setAdditionalInformation(additionalInformation);

            return details;

        } catch (Throwable t) {
            logger.info("Ignoring exception " + t, t);

            // fallback on database only

            Vessel vessel = vesselService.getVessel(mmsi);

            if (vessel != null) {
                VesselDetails details;
                Route route = scheduleService.getActiveRoute(mmsi);
                List<Voyage> schedule = scheduleService.getSchedule(mmsi);

                details = vessel.toJsonModel();

                details.getAis().put("callsign", vessel.getAisData().getCallsign());
                details.getAis().put("imoNo", "" + vessel.getAisData().getImoNo());
                details.getAis().put("mmsi", "" + vessel.getMmsi());
                details.getAis().put("name", "" + vessel.getAisData().getName());

                Map<String, Object> additionalInformation = new HashMap<>();
                additionalInformation.put("routeId", route != null ? route.getEnavId() : null);
                additionalInformation.put("historicalTrack", false);
                additionalInformation.put("schedule", schedule != null && schedule.size() > 0);
                details.setAdditionalInformation(additionalInformation);

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
        logger.debug("save({})", details);
        vesselService.save(Vessel.fromJsonModel(details));
    }

    @PUT
    @Path("/update/ais")
    @Consumes("application/json")
    public void updateAis() {
        logger.debug("updateAis()");
        aisReplicatorJob.replicate();
    }

    @PUT
    @Path("/update/maxspeeds")
    @Consumes("application/json")
    public void updateMaxSpeeds() {
        logger.debug("updateMaxSpeeds()");
        maxSpeedJob.update();
    }

}
