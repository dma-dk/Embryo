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
package dk.dma.embryo.security;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Arrays;

import javax.enterprise.inject.Produces;
import javax.inject.Inject;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.mgt.DefaultSecurityManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.jglue.cdiunit.AdditionalClasses;
import org.jglue.cdiunit.DummyHttpRequest;
import org.jglue.cdiunit.DummyHttpSession;
import org.jglue.cdiunit.InSessionScope;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

import dk.dma.arcticweb.dao.RealmDao;
import dk.dma.embryo.domain.SecuredUser;
import dk.dma.embryo.security.authorization.Permission;

// DummyHttpSession and DummyHttpRequest are necessary to test SessionScoped Subject
@AdditionalClasses({ Subject.class, PermissionExtractor.class, DummyHttpSession.class, DummyHttpRequest.class })
public class SubjectTest extends AbstractShiroTest {

    private static final String PERMITTED_PERMISSION = "permission";

    @BeforeClass
    public static void initShiroRealm() {
        DefaultSecurityManager securityManager = new DefaultSecurityManager();
        securityManager.setRealm(new TestRealm());
        setSecurityManager(securityManager);
    }

    @Produces
    @Mock
    RealmDao realmDao;

    @Inject
    Subject subject;

    @Test
    @InSessionScope
    public void testIsPermittedWithAnnotation_Permission() {
        String user = "permittedUser";
        String pw = "pw";

        Mockito.when(realmDao.findByUsername(user)).thenReturn(new SecuredUser(user, pw));

        subject.login(user, pw);

        Assert.assertTrue(subject.isPermitted(new Component()));

        subject.logout();
    }

    @Test
    @InSessionScope
    public void testIsPermittedWithAnnotation_NoPermission() {
        String user = "nopermission";
        String pw = "pw";

        Mockito.when(realmDao.findByUsername(user)).thenReturn(new SecuredUser(user, pw));

        subject.login(user, pw);

        Assert.assertFalse(subject.isPermitted("not annotated object"));

        subject.logout();
    }

    @TestPermission
    public static class Component {

    }

    @Documented
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.TYPE)
    @Permission(value = PERMITTED_PERMISSION)
    public static @interface TestPermission {

    }

    public static class TestRealm extends AuthorizingRealm {

        public TestRealm() {
            setName("test");
        }

        /**
         * Always authorize a user
         */
        @Override
        protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authToken) {

            UsernamePasswordToken token = (UsernamePasswordToken) authToken;
            return new SimpleAuthenticationInfo(token.getUsername(), new String(token.getPassword()), getName());
        }

        @Override
        protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
            String userName = (String) principals.fromRealm(getName()).iterator().next();
            if ("nopermission".equals(userName)) {
                SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
                info.addRole("role");
                return info;
            } else {
                SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
                info.addRole("bollocks");
                info.addStringPermissions(Arrays.asList("never", "really", "used"));

                info.addRole("role");
                info.addStringPermissions(Arrays.asList("dummy", PERMITTED_PERMISSION));
                return info;

            }
        }
    }
}