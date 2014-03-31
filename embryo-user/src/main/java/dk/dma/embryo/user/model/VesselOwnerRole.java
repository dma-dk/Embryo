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
package dk.dma.embryo.user.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;

import dk.dma.embryo.vessel.model.Vessel;

@Entity
public class VesselOwnerRole extends Role {
    private static final long serialVersionUID = 1L;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Vessel> vessels = new HashSet<Vessel>();

    public VesselOwnerRole() {
        super("vesselOwner");
    }

    public Set<Vessel> getVessels() {
        return vessels;
    }

    public void setVessels(Set<Vessel> vessels) {
        this.vessels = vessels;
    }

}