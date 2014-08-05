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
package dk.dma.arcticweb.reporting.persistence;

import java.util.List;

import javax.ejb.Local;

import dk.dma.arcticweb.reporting.model.GreenPosReport;
import dk.dma.arcticweb.reporting.model.GreenposMinimal;
import dk.dma.arcticweb.reporting.model.GreenposSearch;
import dk.dma.embryo.common.persistence.Dao;

@Local
public interface GreenPosDao extends Dao {

    List<GreenPosReport> find(GreenposSearch search);

    GreenPosReport findById(String id);

    GreenPosReport findLatest(Long vesselMmsi);
    
    List<GreenposMinimal> getLatest();
}
