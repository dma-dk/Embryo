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
package dk.dma.embryo.dataformats.netcdf;

import static org.junit.Assert.assertEquals;

import java.io.Serializable;
import java.net.URL;
import java.util.List;
import java.util.Map;

import org.junit.Ignore;
import org.junit.Test;

import dk.dma.embryo.dataformats.model.ForecastType;
import dk.dma.embryo.dataformats.model.ForecastType.Type;
import dk.dma.embryo.dataformats.service.ForecastServiceImpl;

public class NetCDFParserTest {

    @Test
    @Ignore
    public void readNetCDFFile() throws Exception {
        NetCDFParser parser = new NetCDFParser();
        
        ForecastServiceImpl service = new ForecastServiceImpl();
        service.init();
        List<ForecastType> prognosisTypes = service.createData();
        
        URL resource = getClass().getResource("/netcdf/hycom-cice.nc");
        Map<NetCDFType, NetCDFResult> results = parser.parse(resource.getPath(), prognosisTypes);
        
        Map<String, List<? extends Serializable>> metadata = results.get(service.getPrognosisType(Type.ICE_FORECAST)).getMetadata();
        List<? extends Serializable> latList = metadata.get(NetCDFParser.LAT);
        List<? extends Serializable> lonList = metadata.get(NetCDFParser.LON);
        List<? extends Serializable> timeList = metadata.get(NetCDFParser.TIME);
        assertEquals(101, latList.size());
        assertEquals(101, lonList.size());
        assertEquals(2, timeList.size());
        
        Map<Integer, NetCDFMoment> data = results.get(service.getPrognosisType(Type.ICE_FORECAST)).getData();
        assertEquals(714, data.size());
    }
    
    @Test
    @Ignore
    public void readNetCDFFileWithRestrictions() throws Exception {
        NetCDFParser parser = new NetCDFParser();
        URL resource = getClass().getResource("/netcdf/WAV_2014071400.hh00_test.nc");
        
        ForecastServiceImpl service = new ForecastServiceImpl();
        service.init();
        List<ForecastType> prognosisTypes = service.createData();
        
        NetCDFRestriction restriction = new NetCDFRestriction();
//        restriction.setTimeStart(12);
//        restriction.setTimeInterval(24);
        restriction.setMinLat(5);
        restriction.setMaxLat(15);
        restriction.setMinLon(5);
        restriction.setMaxLon(35);
        Map<NetCDFType, NetCDFResult> results = parser.parse(resource.getPath(), prognosisTypes, restriction);
        
        Map<Integer, NetCDFMoment> data = results.get(service.getPrognosisType(Type.ICE_FORECAST)).getData();
        assertEquals(1548, data.size());
    }
}
