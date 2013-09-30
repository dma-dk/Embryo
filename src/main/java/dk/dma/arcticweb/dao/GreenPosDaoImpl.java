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

import java.util.LinkedList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import dk.dma.embryo.domain.GreenPosReport;
import dk.dma.embryo.domain.GreenposSearch;

@Stateless
public class GreenPosDaoImpl extends DaoImpl implements GreenPosDao {

    public GreenPosDaoImpl() {
        super();
    }

    public GreenPosDaoImpl(EntityManager entityManager) {
        super(entityManager);
    }

    @Override
    public GreenPosReport findLatest(String shipMaritimeId) {
        TypedQuery<GreenPosReport> query = em.createNamedQuery("GreenPosReport:findLatest", GreenPosReport.class);
        query.setParameter("shipMaritimeId", shipMaritimeId);
        query.setMaxResults(1);

        List<GreenPosReport> result = query.getResultList();

        return getSingleOrNull(result);
    }

    @Override
    public List<GreenPosReport> find(GreenposSearch search) {
        CriteriaBuilder builder = em.getCriteriaBuilder(); 
        CriteriaQuery<GreenPosReport> criteriaQuery = builder.createQuery(GreenPosReport.class);
        Root<GreenPosReport> root = criteriaQuery.from(GreenPosReport.class);
        criteriaQuery.select(root);

        
        List<Predicate> criterias = new LinkedList<>();
        
        if(search.getShipMmsi() != null){
            criterias.add(builder.equal(root.get("shipMmsi"), search.getShipMmsi()));
        }
        
        Predicate[] criteriaArr = new Predicate[criterias.size()];
        criteriaArr = criterias.toArray(criteriaArr);
        
        criteriaQuery.where(criteriaArr);
        
        Expression<String> field = root.get(search.getSortByField());
        Order order = "ASC".equals(search.getSortOrder()) ? builder.asc(field) : builder.desc(field);
        criteriaQuery.orderBy(order);
        
        TypedQuery<GreenPosReport> reports = em.createQuery(criteriaQuery);
        reports.setFirstResult(search.getFirst());
        reports.setMaxResults(search.getNumberOfReports());
        
        return reports.getResultList();
    }

    @Override
    public GreenPosReport findById(String id) {
        TypedQuery<GreenPosReport> query = em.createNamedQuery("GreenPosReport:findById", GreenPosReport.class);
        query.setParameter("id", id);
        query.setMaxResults(1);

        List<GreenPosReport> result = query.getResultList();

        return getSingleOrNull(result);
    }

    
}
