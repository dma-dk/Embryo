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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.annotations.GZIP;
import org.jboss.resteasy.client.ClientResponseFailure;
import org.slf4j.Logger;

import com.google.common.collect.Collections2;

import dk.dma.embryo.common.configuration.Property;
import dk.dma.embryo.common.json.AbstractRestService;
import dk.dma.embryo.vessel.job.AisDataService;
import dk.dma.embryo.vessel.job.AisReplicatorJob;
import dk.dma.embryo.vessel.job.filter.UserSelectionGroupsFilter;
import dk.dma.embryo.vessel.json.client.AisClientHelper;
import dk.dma.embryo.vessel.json.client.AisViewServiceAllAisData;
import dk.dma.embryo.vessel.json.client.AisViewServiceAllAisData.TrackSingleLocation;
import dk.dma.embryo.vessel.json.client.Vessel;
import dk.dma.embryo.vessel.model.Route;
import dk.dma.embryo.vessel.model.Voyage;
import dk.dma.embryo.vessel.persistence.VesselDao;
import dk.dma.embryo.vessel.service.ScheduleService;
import dk.dma.embryo.vessel.service.VesselService;

@Path("/vessel")
@RequestScoped
public class VesselRestService extends AbstractRestService {
    
    @Inject
    private AisViewServiceAllAisData historicalTrackAisViewService;
    
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
    private AisReplicatorJob aisReplicatorJob;

    @Inject
    private UserSelectionGroupsFilter userSelectionGroupsFilter;
    
    @Inject
    @Property("dk.dma.embryo.restclients.fullAisViewServiceInclNorwegianDataUrl")
    private String fullAisViewServiceInclNorwegianDataUrl;

    @GET
    @Path("/historical-track")
    @Produces("application/json")
    @GZIP
    public Response historicalTrack(@Context Request request, @QueryParam("mmsi") long mmsi) {
        
        List<TrackSingleLocation> historicalTrack = new ArrayList<>();
        
        // Call long track if this call times out or get any kind of error call the regular track.
        /*
        try {
            
            historicalTrack = historicalLongTrackWithTimeout(mmsi);
            logger.info("Historical LONG track called with success.");
        } catch (Exception e) {

            historicalTrack = this.historicalTrackAisViewService.historicalTrack(mmsi, 500, AisViewServiceAllAisData.LOOK_BACK_PT24H);
            logger.info("Historical LONG track timeout or failed but SHORT track called instead with success.");
        } 
        */
        
        // The above statments are kept as comments because LONG tracks are disable because of instability.
        
        try {
            historicalTrack = this.historicalTrackAisViewService.historicalTrack(mmsi, 500, AisViewServiceAllAisData.LOOK_BACK_PT24H);
        } catch (ClientResponseFailure crf) {

            if(crf.getResponse().getStatus() == 404) {
                return Response.noContent().build();
            } else {
                throw crf;
            }
        }

        return super.getResponse(request, historicalTrack, MAX_AGE_10_MINUTES);
        
    }
    /*
    private List<TrackSingleLocation> historicalLongTrackWithTimeout(long mmsi) throws IOException {
        
        HttpParams httpParams = new BasicHttpParams();
        HttpClient httpClient = new DefaultHttpClient();

        // Determines the timeout until a connection is etablished.
        HttpConnectionParams.setConnectionTimeout(httpParams, 3000);
        // Defines the default socket timeout (SO_TIMEOUT) in milliseconds which is the timeout for waiting for data.
        HttpConnectionParams.setSoTimeout(httpParams, 10000);

        
        String url = this.fullAisViewServiceInclNorwegianDataUrl;

        HttpGet getRequest = new HttpGet(url + "/vessel/longtrack/" + mmsi);
        getRequest.addHeader("accept", "application/json");

        httpParams.setIntParameter("minDist", 500);
        httpParams.setParameter("age", AisViewServiceAllAisData.LOOK_BACK_PT120H);
        getRequest.setParams(httpParams);

        HttpResponse response = httpClient.execute(getRequest);

        String json = EntityUtils.toString(response.getEntity());

        List<LinkedHashMap<String, Object>> ob = new ObjectMapper().readValue(json, ArrayList.class);

        List<TrackSingleLocation> historicalTrack = new ArrayList<>();
        for (LinkedHashMap<String, Object> linkedHashMap : ob) {
            Double cog = (Double) linkedHashMap.get("cog");
            Double lat = (Double) linkedHashMap.get("lat");
            Double lon = (Double) linkedHashMap.get("lon");
            Double sog = (Double) linkedHashMap.get("sog");
            Long time = (Long) linkedHashMap.get("time");

            TrackSingleLocation point = new TrackSingleLocation(cog, lat, lon, sog, time);
            historicalTrack.add(point);
        }

        httpClient.getConnectionManager().shutdown();

        return historicalTrack;
    }*/

    @GET
    @Path("/list")
    @Produces("application/json")
    @GZIP
    public Response list(@Context Request request) {
        
        List<dk.dma.embryo.vessel.model.Vessel> articWebVesselsAsList = this.getArcticWebVesselsFromDatabase();
        logger.info("Repository returns " + articWebVesselsAsList.size() + " vessels from the database.");

        List<Vessel> aisVessels = this.aisDataService.getAisVessels(userAllowedToSeeExactEarthVessels(), userHasAnyActiveSelectionGroups());
        
        
        /*
         * eksisterende kode
         */
        
        List<dk.dma.embryo.vessel.model.Vessel> allArcticWebVessels = vesselDao.getAll(dk.dma.embryo.vessel.model.Vessel.class);

        List<VesselOverview> result = new ArrayList<VesselOverview>();
        
        if (userHasAnyActiveSelectionGroups()) {
            
            List<VesselOverview> allAllowedAisVessels = AisClientHelper.mapAisVessels(aisVessels);
            
            // OBS: this filter removes the ArcticWeb vessels if they got a position outside the Selection Groups.
            result.addAll(Collections2.filter(allAllowedAisVessels, userSelectionGroupsFilter));
            
            for (dk.dma.embryo.vessel.model.Vessel vesselFromDatabase : allArcticWebVessels) {
                
                VesselOverview vesselToAdd = findVesselByMmsi(allAllowedAisVessels, vesselFromDatabase.getMmsi());
                
                setIsArcticWebFlagAndAddToResult(result, vesselFromDatabase, vesselToAdd);
            }
            
        } else /* Go default */ {
            
            result = AisClientHelper.mapAisVessels(aisVessels);
            
            for (dk.dma.embryo.vessel.model.Vessel vesselFromDatabase : allArcticWebVessels) {
                
                VesselOverview vesselToAdd = findVesselByMmsi(result, vesselFromDatabase.getMmsi());
                
                setIsArcticWebFlagAndAddToResult(result, vesselFromDatabase, vesselToAdd);
            }
        }
        
        return super.getResponse(request, result, NO_CACHE);
        
    }
    
    private List<dk.dma.embryo.vessel.model.Vessel> getArcticWebVesselsFromDatabase() {
        return this.vesselDao.getAll(dk.dma.embryo.vessel.model.Vessel.class);
    }
    
    private void setIsArcticWebFlagAndAddToResult(List<VesselOverview> result, dk.dma.embryo.vessel.model.Vessel vesselFromDatabase, VesselOverview aisVesselOverview) {
       
        if (bothArcticWebAndAisVessel(aisVesselOverview)) {
            
            aisVesselOverview.setInAW(true);
            
            // Important check otherwise the result will either contain duplicates or miss some vessels.
            if(userHasAnyActiveSelectionGroups()) {
                result.add(aisVesselOverview);
            }
        } else /* only database vessel then create new DTO and add to list */ {
            
            result.add(createVesselOverview(vesselFromDatabase));
        }
    }

    private boolean userHasAnyActiveSelectionGroups() {
        return this.userSelectionGroupsFilter.loggedOnUserHasSelectionGroups();
    }
    
    private boolean userAllowedToSeeExactEarthVessels() {
        return this.userSelectionGroupsFilter.userAllowedToSeeExactEarthVessels();
    }

    private VesselOverview findVesselByMmsi(List<VesselOverview> allAllowedAisVesselsAsDTO, Long mmsi) {
       
        for (VesselOverview vesselOverview : allAllowedAisVesselsAsDTO) {
            if(vesselOverview.getMmsi().longValue() == mmsi.longValue()) {
                return vesselOverview;
            }
        }
        
        return null;
    }

    private VesselOverview createVesselOverview(dk.dma.embryo.vessel.model.Vessel vesselFromDatabase) {
        VesselOverview arcticWebVesselOnly = new VesselOverview();
        arcticWebVesselOnly.setInAW(true);
        arcticWebVesselOnly.setCallSign(vesselFromDatabase.getAisData().getCallsign());
        arcticWebVesselOnly.setName(vesselFromDatabase.getAisData().getName());
        arcticWebVesselOnly.setMmsi(vesselFromDatabase.getMmsi());
        return arcticWebVesselOnly;
    }

    private boolean bothArcticWebAndAisVessel(VesselOverview vesselOverview) {
        return vesselOverview != null;
    }

    @GET
    @Path("/details")
    @Produces("application/json")
    @GZIP
    @Details
    public Response details(@Context Request request, @QueryParam("mmsi") long mmsi) {
        logger.debug("details({})", mmsi);

        try {

            logger.info("details method called with MMSI -> " + mmsi);
            Vessel aisVessel = this.aisDataService.getAisVesselByMmsi(mmsi);

            boolean historicalTrack = false;
            Double lat = null;
            Double lon = null;

            if (aisVessel != null) {
                lat = aisVessel.getLat();
                lon = aisVessel.getLon();
            }

            if (lat != null && lon != null) {
                historicalTrack = aisDataService.isAllowed(lat);
            }

            VesselDetails details;
            dk.dma.embryo.vessel.model.Vessel vessel = vesselService.getVessel(mmsi);
            List<Voyage> schedule = null;
            Route route = null;

            if (vessel != null) {
                route = scheduleService.getActiveRoute(mmsi);
                details = vessel.toJsonModel();
                schedule = scheduleService.getSchedule(mmsi);
                details.setAisVessel(aisVessel);
            } else {
                details = new VesselDetails();
                details.setAisVessel(aisVessel);
            }

            Map<String, Object> additionalInformation = new HashMap<>();
            additionalInformation.put("historicalTrack", historicalTrack);
            additionalInformation.put("routeId", route != null ? route.getEnavId() : null);
            additionalInformation.put("schedule", schedule != null && schedule.size() > 0);

            details.setAdditionalInformation(additionalInformation);

            Response response = super.getResponse(request, details, MAX_AGE_10_MINUTES);
            return response;

        } catch (Throwable t) {

            logger.info("Ignoring exception " + t, t);

            // fallback on database only

            dk.dma.embryo.vessel.model.Vessel vessel = vesselService.getVessel(mmsi);

            if (vessel != null) {
                VesselDetails details;
                Route route = scheduleService.getActiveRoute(mmsi);
                List<Voyage> schedule = scheduleService.getSchedule(mmsi);

                details = vessel.toJsonModel();

                Vessel aisVessel = new Vessel();
                aisVessel.setCallsign(vessel.getAisData().getCallsign());
                aisVessel.setImoNo(vessel.getAisData().getImoNo());
                aisVessel.setMmsi(vessel.getMmsi());
                aisVessel.setName(vessel.getAisData().getName());

                Map<String, Object> additionalInformation = new HashMap<>();
                additionalInformation.put("routeId", route != null ? route.getEnavId() : null);
                additionalInformation.put("historicalTrack", false);
                additionalInformation.put("schedule", schedule != null && schedule.size() > 0);
                details.setAdditionalInformation(additionalInformation);
                
                Response response = super.getResponse(request, details, MAX_AGE_10_MINUTES);
                return response;
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
        vesselService.save(dk.dma.embryo.vessel.model.Vessel.fromJsonModel(details));
    }

    @PUT
    @Path("/update/ais")
    @Consumes("application/json")
    public void updateAis() {
        logger.debug("updateAis()");
        aisReplicatorJob.replicate();
    }
}
