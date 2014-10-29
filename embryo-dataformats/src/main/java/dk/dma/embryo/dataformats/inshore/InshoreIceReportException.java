/*
 * Copyright (c) 2011 Danish Maritime Authority.
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

package dk.dma.embryo.dataformats.inshore;

import java.util.Map;

/**
 * Created by Jesper Tejlgaard on 10/22/14.
 */
public class InshoreIceReportException extends Exception {

    private Map<String, Exception> causes;

    public InshoreIceReportException(Map<String, Exception> causes) {
        this.causes = causes;
    }

    public Map<String, Exception> getCauses() {
        return causes;
    }
}