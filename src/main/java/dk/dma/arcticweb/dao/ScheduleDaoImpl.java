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
package dk.dma.arcticweb.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.joda.time.LocalDateTime;

import dk.dma.embryo.domain.Route;
import dk.dma.embryo.domain.Vessel;
import dk.dma.embryo.domain.Voyage;

@Stateless
public class ScheduleDaoImpl extends DaoImpl implements ScheduleDao {

    public ScheduleDaoImpl() {
        super();
    }

    public ScheduleDaoImpl(EntityManager entityManager) {
        super(entityManager);
    }


    @Override
    public List<Voyage> getSchedule(Long mmsi) {
        TypedQuery<LocalDateTime> datequery = em.createQuery("select MAX(v.departure) from Voyage v where v.vessel.mmsi = :mmsi AND date(v.departure) < CURRENT_DATE()", LocalDateTime.class);
//        TypedQuery<LocalDateTime> datequery = em.createQuery("select FUNCTION('MAX', v.departure) AS DATETIME from Voyage v where v.schedule.vessel.mmsi = :mmsi AND FUNCTION('DATE', v.departure) < FUNCTION('CURDATE')", LocalDateTime.class);
        datequery.setParameter("mmsi", mmsi);

        LocalDateTime date = datequery.getSingleResult();
        
        TypedQuery<Voyage> query = em.createNamedQuery("Voyage:getByMmsi", Voyage.class);
        query.setParameter("mmsi", mmsi);
        query.setParameter("date", date.toDate());

        List<Voyage> result = query.getResultList();

        return result;
    }

    @Override
    public Route getActiveRoute(Long mmsi) {
        TypedQuery<Vessel> query = em.createNamedQuery("Vessel:getByMmsi", Vessel.class);
        query.setParameter("mmsi", mmsi);

        List<Vessel> result = query.getResultList();

        Vessel vessel = getSingleOrNull(result);

        if (vessel == null || vessel.getActiveVoyage() == null) {
            return null;
        }

        return vessel.getActiveVoyage().getRoute();
    }

    @Override
    public Long getRouteId(String enavId) {
        TypedQuery<Long> query = em.createNamedQuery("Route:getId", Long.class);
        query.setParameter("enavId", enavId);

        List<Long> result = query.getResultList();

        return getSingleOrNull(result);
    }

    @Override
    public Route getRouteByEnavId(String enavId) {
        TypedQuery<Route> query = em.createNamedQuery("Route:getByEnavId", Route.class);
        query.setParameter("enavId", enavId);

        List<Route> result = query.getResultList();

        return getSingleOrNull(result);
    }

    @Override
    public Voyage getVoyageByEnavId(String enavId) {
        TypedQuery<Voyage> query = em.createNamedQuery("Voyage:getByEnavId", Voyage.class);
        query.setParameter("enavId", enavId);

        List<Voyage> result = query.getResultList();

        return getSingleOrNull(result);
    }

    @Override
    public List<Voyage> getByEnavIds(List<String> enavIds) {
        TypedQuery<Voyage> query = em.createNamedQuery("Voyage:getByEnavIds", Voyage.class);
        query.setParameter("enavIds", enavIds);
        List<Voyage> result = query.getResultList();
        return result;
    }

}
