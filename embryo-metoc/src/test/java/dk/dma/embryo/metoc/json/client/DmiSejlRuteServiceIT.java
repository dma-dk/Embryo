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
package dk.dma.embryo.metoc.json.client;

import java.util.Date;

import javax.inject.Inject;

import org.jglue.cdiunit.AdditionalClasses;
import org.jglue.cdiunit.CdiRunner;
import org.junit.Test;
import org.junit.runner.RunWith;

import dk.dma.embryo.common.configuration.PropertyFileService;

@RunWith(CdiRunner.class)
@AdditionalClasses(value = {MetocJsonClientFactory.class, PropertyFileService.class})
public class DmiSejlRuteServiceIT {
    @Inject
    DmiSejlRuteService dmiSejlRuteService;

    @Test
    public void test() {
        DmiSejlRuteService.SejlRuteRequest request = new DmiSejlRuteService.SejlRuteRequest();
        request.setMssi(999999999);
        request.setDatatypes(new String[]{"sealevel", "current", "wave", "wind", "density"});
        request.setDt(15);

        DmiSejlRuteService.Waypoint wp1 = new DmiSejlRuteService.Waypoint();
        wp1.setEta(DmiSejlRuteService.DATE_FORMAT.format(new Date(System.currentTimeMillis() + 1000L * 3600 * 0)));
        wp1.setHeading("RL");
        wp1.setLat(55.70816666666666);
        wp1.setLon(12.3115);

        DmiSejlRuteService.Waypoint wp2 = new DmiSejlRuteService.Waypoint();
        wp2.setEta(DmiSejlRuteService.DATE_FORMAT.format(new Date(System.currentTimeMillis() + 1000L * 3600 * 3)));
        wp2.setHeading("RL");
        wp2.setLat(55.725183333333334);
        wp2.setLon(12.648666666666667);

        DmiSejlRuteService.Waypoint wp3 = new DmiSejlRuteService.Waypoint();
        wp3.setEta(DmiSejlRuteService.DATE_FORMAT.format(new Date(System.currentTimeMillis() + 1000L * 3600 * 0)));
        wp3.setHeading("RL");
        wp3.setLat(63.725183333333334);
        wp3.setLon(53.648666666666667);

        DmiSejlRuteService.Waypoint wp4 = new DmiSejlRuteService.Waypoint();
        wp4.setEta(DmiSejlRuteService.DATE_FORMAT.format(new Date(System.currentTimeMillis() + 1000L * 3600 * 3)));
        wp4.setHeading("RL");
        wp4.setLat(63.725183333333334);
        wp4.setLon(52.648666666666667);

        
        request.setWaypoints(new DmiSejlRuteService.Waypoint[]{wp3, wp4});
        System.out.println("request : " + request);
        
        DmiSejlRuteService.SejlRuteResponse sejlRuteResponse = dmiSejlRuteService.sejlRute(request);
        System.out.println("" + sejlRuteResponse);
    }
}
