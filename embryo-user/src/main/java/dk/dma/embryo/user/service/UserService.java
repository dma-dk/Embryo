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
package dk.dma.embryo.user.service;

import java.util.List;

import javax.ejb.FinderException;

import dk.dma.embryo.user.model.SecuredUser;
import dk.dma.embryo.user.model.SelectionGroup;



public interface UserService {

    List<SecuredUser> list();

    void create(String login, String password, Long mmsi, String email, String role, boolean accessToAisData);

    void edit(String login, Long mmsi, String email, String role, boolean accessToAisData);

    void delete(String login);

    void createPasswordUuid(SecuredUser user);
    
    void changePassword(String uuid, String password) throws FinderException;
    
    void updateSelectionGroups(List<SelectionGroup> selectionGroups, String userName) throws FinderException;
}
