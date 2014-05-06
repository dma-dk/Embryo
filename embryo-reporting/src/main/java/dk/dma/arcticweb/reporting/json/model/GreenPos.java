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
package dk.dma.arcticweb.reporting.json.model;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import dk.dma.embryo.vessel.json.Voyage;

public class GreenPos {

    private String id;

    private String type;

    private String vesselName;

    private Long mmsi;

    private String callSign;

    private Double lat;

    private Double lon;

    private String weather;

    private String ice;

    private Double speed;

    private Integer course;

    private String destination;

    private Integer personsOnBoard;

    private Date eta;

    private String description;

    private List<Voyage> voyages;

    private String reporter;

    private Date ts;
    
    private String[] recipients;

    // //////////////////////////////////////////////////////////////////////
    // Constructors
    // //////////////////////////////////////////////////////////////////////
    public GreenPos() {
    }

    // //////////////////////////////////////////////////////////////////////
    // Object methods
    // //////////////////////////////////////////////////////////////////////
    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this);
    }

    // //////////////////////////////////////////////////////////////////////
    // Property methods
    // //////////////////////////////////////////////////////////////////////
    public String getVesselName() {
        return vesselName;
    }

    public void setVesselName(String name) {
        this.vesselName = name;
    }

    public Long getMmsi() {
        return mmsi;
    }

    public void setMmsi(Long mmsi) {
        this.mmsi = mmsi;
    }

    public String getCallSign() {
        return callSign;
    }

    public void setCallSign(String callSign) {
        this.callSign = callSign;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double latitude) {
        this.lat = latitude;
    }

    public Double getLon() {
        return lon;
    }

    public void setLon(Double longitude) {
        this.lon = longitude;
    }

    public String getType() {
        return type;
    }

    public void setType(String reportType) {
        this.type = reportType;
    }

    public String getWeather() {
        return weather;
    }

    public void setWeather(String weather) {
        this.weather = weather;
    }

    public String getIce() {
        return ice;
    }

    public void setIce(String iceInformation) {
        this.ice = iceInformation;
    }

    public String getReporter() {
        return reporter;
    }

    public void setReporter(String reportedBy) {
        this.reporter = reportedBy;
    }

    public Double getSpeed() {
        return speed;
    }

    public void setSpeed(Double speed) {
        this.speed = speed;
    }

    public Integer getCourse() {
        return course;
    }

    public void setCourse(Integer course) {
        this.course = course;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Integer getPersonsOnBoard() {
        return personsOnBoard;
    }

    public void setPersonsOnBoard(Integer personsOnBoard) {
        this.personsOnBoard = personsOnBoard;
    }

    public Date getEta() {
        return eta;
    }

    public void setEta(Date eta) {
        this.eta = eta;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Voyage> getVoyages() {
        return voyages;
    }

    public void setVoyages(List<Voyage> voyages) {
        this.voyages = voyages;
    }

    public Date getTs() {
        return ts;
    }

    public void setTs(Date reportedTs) {
        this.ts = reportedTs;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String[] getRecipients() {
        return recipients;
    }
    
    public void setRecipients(String[] receipients) {
        this.recipients = receipients;
    }
}
