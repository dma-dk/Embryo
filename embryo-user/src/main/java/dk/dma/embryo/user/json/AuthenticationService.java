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
package dk.dma.embryo.user.json;

import javax.ejb.FinderException;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.jboss.resteasy.annotations.GZIP;
import org.jboss.resteasy.annotations.cache.NoCache;
import org.slf4j.Logger;

import dk.dma.embryo.common.configuration.Property;
import dk.dma.embryo.common.log.EmbryoLogService;
import dk.dma.embryo.user.model.SailorRole;
import dk.dma.embryo.user.model.SecuredUser;
import dk.dma.embryo.user.persistence.RealmDao;
import dk.dma.embryo.user.security.Subject;
import dk.dma.embryo.user.service.UserService;

@Path("/authentication")
public class AuthenticationService {
    @Inject
    private Subject subject;

    @Inject
    private UserService userService;

    @Inject
    private RealmDao realmRepository;

    @Inject
    private Logger logger;

    @Inject
    private EmbryoLogService embryoLogService;

    @Inject
    @Property("embryo.osm.url")
    private String osm;

    @GET
    @Path("/details")
    @Produces("application/json")
    @GZIP
    @NoCache
    public Details details() {
        SecuredUser user = subject.getUser();
        if (user == null) {
            throw new UserNotAuthenticated();
        }

        Details details = new Details();

        if (subject.hasRole(SailorRole.class)) {
            SailorRole sailor = realmRepository.getSailor(subject.getUserId());
            details.setShipMmsi("" + sailor.getVessel().getMmsi());
        }

        String[] rolesJson = new String[] { user.getRole().getLogicalName() };
        details.setProjection("EPSG:900913");
        details.setUserName(user.getUserName());
        details.setPermissions(rolesJson);
        details.setOsm(osm);

        logger.debug("details() : {}", details);
        return details;
    }

    @GET
    @Path("/logout")
    @Produces("application/json")
    @GZIP
    @NoCache
    public void logout() {
        if (subject != null && subject.getUser() != null) {
            logger.debug("User {} logged out", subject.getUser().getUserName());
            embryoLogService.info("User " + subject.getUser().getUserName() + " logged out");
        } else {
            logger.error("Attempt to logout all though not logged in");
            embryoLogService.error("Attempt to logout all though not logged in");
        }
        subject.logout();
    }

    @GET
    @Path("/login")
    @Produces("application/json")
    @GZIP
    @NoCache
    public Details login(@QueryParam("userName") String userName, @QueryParam("password") String password) {
        try {
            SecuredUser user = subject.login(userName, password);

            if (user != null) {
                logger.debug("User {} logged in", userName);
                embryoLogService.info("User " + userName + " logged in");
                return details();
            } else {
                logger.debug("User {} not logged in (wrong username / password)", userName);
                embryoLogService.info("User " + userName + " not logged in (wrong username / password)");
                throw new UserNotAuthenticated();
            }
        } catch (org.apache.shiro.authc.IncorrectCredentialsException e) {
            logger.debug("User {} not logged in (wrong username / password)", userName);
            embryoLogService.info("User " + userName + " not logged in (wrong username / password)");
            throw new UserNotAuthenticated();
        }

    }

    @GET
    @Path("/change-password")
    @GZIP
    @NoCache
    public String getUserForUuid(@QueryParam("uuid") String uuid) {
        SecuredUser user = subject.findUserWithUuid(uuid);
        if (user != null) {
            return user.getUserName();
        }
        return null;
    }

    public static class UserNotAuthenticated extends WebApplicationException {
        private static final long serialVersionUID = 7940360206022406100L;

        public UserNotAuthenticated() {
            super(Response.Status.UNAUTHORIZED);
        }
    }

    public static class ParameterMissing extends WebApplicationException {
        private static final long serialVersionUID = 3153251523607924598L;

        public ParameterMissing(String error) {
            super(Response.status(Response.Status.BAD_REQUEST).entity(error).build());
        }
    }

    @POST
    @Path("/change-password")
    @Consumes("application/json")
    @GZIP
    public void changePassword(ChangedPassword changedPassword) {
        if (changedPassword.getUuid() == null || changedPassword.getUuid().isEmpty()) {
            throw new ParameterMissing("UUID is missing.");
        } else if (changedPassword.getPassword() == null || changedPassword.getPassword().isEmpty()) {
            throw new ParameterMissing("Password is missing.");
        } else {
            try {
                userService.changePassword(changedPassword.getUuid(), changedPassword.getPassword());
            } catch (FinderException e) {
                throw new WebApplicationException(Response.status(Status.NOT_FOUND).entity(e.getMessage()).build());
            }
        }
    }

    public static class ChangedPassword {
        private String uuid;
        private String password;

        public String getUuid() {
            return uuid;
        }

        public void setUuid(String uuid) {
            this.uuid = uuid;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class Details {
        private String shipMmsi;
        private String projection;
        private String userName;
        private String[] permissions;
        private String osm;

        public String getShipMmsi() {
            return shipMmsi;
        }

        public void setShipMmsi(String shipMmsi) {
            this.shipMmsi = shipMmsi;
        }

        public String getProjection() {
            return projection;
        }

        public void setProjection(String projection) {
            this.projection = projection;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String[] getPermissions() {
            return permissions;
        }

        public void setPermissions(String[] permissions) {
            this.permissions = permissions;
        }

        public String getOsm() {
            return osm;
        }

        public void setOsm(String osm) {
            this.osm = osm;
        }

        @Override
        public String toString() {
            return ReflectionToStringBuilder.toString(this);
        }
    }
}
