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
package dk.dma.embryo.vessel.job;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.ScheduleExpression;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.ejb.Timeout;
import javax.ejb.TimerConfig;
import javax.ejb.TimerService;
import javax.inject.Inject;

import org.apache.commons.lang.ObjectUtils;
import org.slf4j.Logger;

import dk.dma.embryo.common.configuration.Property;
import dk.dma.embryo.common.log.EmbryoLogService;
import dk.dma.embryo.vessel.json.client.AisViewService.VesselListResult;
import dk.dma.embryo.vessel.json.client.FullAisViewService;
import dk.dma.embryo.vessel.model.Vessel;
import dk.dma.embryo.vessel.persistence.VesselDao;

@Singleton
@Startup
public class AisReplicatorJob {
    @Inject
    private VesselDao vesselRepository;

    @Inject
    private AisDataService aisDataService;

    @Inject
    private FullAisViewService aisView;

    @Resource
    private TimerService service;

    @Property(value = "embryo.vessel.aisjob.enabled")
    @Inject
    private String enabled;

    @Inject
    @Property("embryo.vessel.aisjob.cron")
    private ScheduleExpression cron;

    @Inject
    private Logger logger;

    @Inject
    private EmbryoLogService embryoLogService;

    public AisReplicatorJob() {
    }

    @PostConstruct
    public void startTimer() {
        logger.info("Setting up ais replication job");

        if (enabled != null && "true".equals(enabled.trim().toLowerCase()) && cron != null) {
            // Replicate AIS information 5 seconds after startup
            service.createSingleActionTimer(5000, new TimerConfig(null, false));

            // Replite AIS data on confired interval
            TimerConfig config = new TimerConfig(null, false);
            service.createCalendarTimer(cron, config);
        } else {
            logger.info("Ais replication job not enabled");
        }
    }

    //@Interceptors(value = AuthorizationChecker.class)
    //@Roles(AdministratorRole.class)
    public void replicate() {
        updateAis();
    }

    /**
     * Executes on startup
     */
    @Timeout
    void updateAis() {
        try {
            logger.debug("UPDATE AIS VESSEL DATA");

            VesselListResult result = aisView.vesselList(0);

            List<Vessel> awVesselsAsList = vesselRepository.getAll(Vessel.class);

            logger.debug("aisView returns " + result.getVesselList().getVessels().size() + " items - "
                    + "repository returns " + awVesselsAsList.size() + " items.");

            Map<Long, Vessel> awVesselsAsMap = new HashMap<>();

            for (Vessel v : awVesselsAsList) {
                awVesselsAsMap.put(v.getMmsi(), v);
            }

            for (Entry<String, String[]> aisVessel : result.getVesselList().getVessels().entrySet()) {
                Long mmsi = asLong(aisVessel.getValue()[6]);
                String name = asString(aisVessel.getValue()[7]);
                String callSign = asString(aisVessel.getValue()[8]);
                Long imo = asLong(aisVessel.getValue()[9]);

                if (mmsi != null) {
                    Vessel vessel = awVesselsAsMap.get(mmsi);

                    if (vessel != null && name != null && callSign != null) {
                        if (!isUpToDate(vessel.getAisData(), name, callSign, imo)) {
                            vessel.getAisData().setCallsign(callSign);
                            vessel.getAisData().setImoNo(imo);
                            vessel.getAisData().setName(name);
                            logger.debug("Updating vessel {}/{}", mmsi, name);
                            vesselRepository.saveEntity(vessel);
                        } else {
                            logger.debug("Vessel {}/{} is up to date", mmsi, name);
                        }
                    }
                }
            }

            List<String[]> vesselsInAisCircle = new ArrayList<>();
            List<String[]> vesselsOnMap = new ArrayList<>();

            for (String[] aisVessel : result.getVesselList().getVessels().values()) {
                double x = Double.parseDouble(aisVessel[2]);
                double y = Double.parseDouble(aisVessel[1]);

                Long mmsi = asLong(aisVessel[6]);

                boolean isWithInAisCircle = aisDataService.isWithinAisCircle(x, y);
                if (isWithInAisCircle || awVesselsAsMap.containsKey(mmsi)) {
                    vesselsOnMap.add(aisVessel);
                }
                if (aisDataService.isWithinAisCircle(x, y)) {
                    vesselsInAisCircle.add(aisVessel);
                }
            }

            logger.debug("Vessels in AIS circle: " + vesselsInAisCircle.size());
            logger.debug("Vessels on Map : " + vesselsOnMap.size());

            aisDataService.setVesselsInAisCircle(vesselsInAisCircle);
            aisDataService.setVesselsOnMap(vesselsOnMap);

            embryoLogService.info("AIS data replicated. Vessel count: " + vesselsInAisCircle.size());
        } catch (Throwable t) {
            embryoLogService.error("" + t, t);
        }
    }

    private boolean isUpToDate(dk.dma.embryo.vessel.model.AisData aisData, String name, String callSign, Long imo) {
        return ObjectUtils.equals(aisData.getName(), name) && ObjectUtils.equals(aisData.getCallsign(), callSign)
                && ObjectUtils.equals(aisData.getImoNo(), imo);
    }

    private Long asLong(String value) {
        return value == null || value.trim().length() == 0 || value.trim().toUpperCase().equals("N/A") ? null : Long
                .valueOf(value);
    }

    private String asString(String value) {
        return value == null || value.trim().length() == 0 || value.trim().toUpperCase().equals("N/A") ? null : value;
    }
}