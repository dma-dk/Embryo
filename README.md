Embryo
=========

A tool for ships sailing in the Arctic region around Greenland. ArcticWeb serves as a single access point to safety related information, provides streamlined reporting and allows for voluntary coordinated voyage through sharing of positions and planned routes.

## Software Architecture

The ArcticWeb client is a rich client HTML/JS-application with a server side JSON webservice API. The server is a J2EE 6 application.

On the client side we use:

* JavaScript/HTML
* Grunt (for building)
* OpenLayers (for maps)
* JQuery (for DOM-manipulation and calling webservices)
* Twitter Bootstrap (for basic layout)
* AngularJS (for forms and similar)
* HTML5 Application Cache
* Karma (for unit testing)

On the server side we use:

* Java 7
* Maven (for building)
* EJB3.1/JPA(Hibernate) (for persistance)
* CDI/JSR330 (for dependency injection)
* Resteasy (for JSON-webservices)
* Shiro (for security)
* Apache CXF (for SOAP-webservices)
* JUnit (for unit-test)
* Mockito (for mocking)


## Prerequisites ##

* Java JDK 1.7
* Maven 3.x
* JBoss 7.1.1 (Maven setup to deploy to JBoss)
* MySQL (Maven configures JBoss datasource to use MySQL)
* Node.js (Follow the installation instructions at http://nodejs.org)
* Grunt.js (Follow the installation instructions at http://gruntjs.com)

## Initial setup

As root in MySQL - create a database and a user for ArcticWeb:

    create database embryo;
    create user 'embryo'@'localhost' identified by 'embryo';
    grant all on embryo.* to 'embryo'@'localhost';

ArcticWeb has a default configuration file which may be overridden by setting the system property "arcticweb.configuration" to the URI of an external configuration file. For example put the following in your JBOSS standalone.xml-file:

    <system-properties>
        <property name="arcticweb.configuration" value="file:///Users/chvid/sfs/arcticweb.properties"/>
    </system-properties>

In particular the file may contain URLs and passwords for the DMI Ice map server.


## Building ##

    mvn clean install


## Deploy to JBoss

* Initial deployment (Clean, build, install database drivers environmental variables and deploy application)
    mvn install -P fulldeploy
* Daily deployment
    mvn jboss-as:deploy - Just deploy the WAR-file

A local deployment will setup ArcticWeb at the following URL:

    http://localhost:8080/arcticweb/

To setup test users and data you must first login with dma/qwerty and thereafter push the button at the following URL

    http://localhost:8080/arcticweb/testdata.html

Thereafter you can login with orasila/qwerty, oratank/qwerty, dmi/qwerty, etc. 

## Instant reload of web resources

Grunt has been setup to run a livereload server, which enables instant reload of static web resources (html, css, js, images) upon saving them. Go to the project folder and execute

    grunt server

Then visit the url: http://localhost:9000/arcticweb/front.html

You will now be able to test/see changes to static web resources almost instantly. 

(All REST http calls are proxied to the JBoss server installation at port 8080). 

## Checkstyle

See https://github.com/dma-dk/dma-developers

## JSLint

Execute the following Maven command to lint your JavaScript files:

    mvn jslint4java:lint


## JavaScript Unit Test

JavaScript may be tested using Node.js, NPM and Karma. Follow this blog (http://jespertejlgaard.blogspot.dk/2013/08/installing-nodejs-npm-and-karma-on.html) to install Node.js, NPM and Karma (at least on Linux) and install the plugins:

    sudo npm install -g karma-junit-reporter
    sudo npm install -g karma-phantomjs-launcher

Execution of unit tests are performed on the developer machines by a Karma server, which will discover changes in the project JavaScript files and execute all JS unit tests. The Karma server is started by executing:

    scripts/test.sh (unit tests on linux/MaC)
    scripts\test.bat (unit tests on Windows)

Test execution is performed on the continuous integration server using the maven-karma-plugin. The plugin can be executed on any machine with Node.js and karma installed by executing the command

    mvn 'karma:start'

or as part of the build:

    'mvn -Pkarma install'

The installation of karma and usage of the maven-karma-plugin is described here 'TO BE INSERTED'.


## Eclipse setup ##

Use standard Eclipse project:

* Go to command line and execute: mvn eclipse:eclipse
* Choose File > Import and then General > Existing Projects into Worksapce

Use Eclipse Maven integration:

* Choose File > Import and then Maven > Existing Maven Projects


## JavaScript Validation Errors in Eclipse

Ways to avoid annoying JavaScript Validation Errors in Eclipse:

http://stackoverflow.com/questions/7102299/eclipse-javascript-validation-disabled-but-still-generating-errors


## Demo test server

More stable releases are demoed from this test server:

http://test.e-navigation.net/arcticweb (requires credentials only available to development team)


## CI Test Server - Latest and Greatest

The CI server continuously deployes the latest and greatest to a separate test server:

http://appsrv-alpha.e-navigation.net/arcticweb/ (requires credentials only available to development team)

## Database maintenaince

Hibernate can be used to maintain the database (good in development mode) where as Liquibase is used in more stable environments (like production). Which strategy is used depends on two properties hibernate.hbm2ddl.auto and embryo.liquibase.enabled.

<table>
  <tr>
    <th>Property</th><th>Values</th><th>Where</th><th>Dev (default)</th><th>Production</th>
  </tr>
  <tr>
    <td>hibernate.hbm2ddl.auto</td><td>create, create-drop, update and validate</td><td>pom.xml or Maven command line property</td><td>update</td><td>validate</td>
  </tr>
  <tr>
    <td>embryo.liquibase.enabled</td><td>true/false</td><td>default or system configuration file (see above)</td><td>false</td><td>true</td>
  </tr>
  <tr>
    <td>embryo.liquibase.changelog</td><td>path to changelog file</td><td>default or system configuration file (see above)</td><td> - </td><td>/liquibase/changelog.xml</td>
  </tr>
</table>

hibernate.hbm2ddl.auto may be set on command line when building a war archive as follows: 

    mvn clean package -Dhibernate.hbm2ddl.auto=validate

## Surveillance

The application contains a number of integrations with external systems. These may be either jobs running at different schedules or HTTP calls directly to the external system. The success rate of the integration executions are logged in the application database and can be retrieved using a public REST call. 

Names of the integration jobs/services of can be retrieved calling the URL:

    http(s)://host/arcticweb/rest/log/services

The latest log entry of a specific job/service can be retrieved by the URL

    http(s)://host/arcticweb/rest/log/latest?service=dk.dma.arcticweb.filetransfer.DmiFtpReaderJob

where dk.dma.arcticweb.filetransfer.DmiFtpReaderJob is the job name. This will return a JSON response in the format

    {
      "service":"dk.dma.arcticweb.filetransfer.DmiFtpReaderJob",
      "status":"OK",
      "message":"Scanned DMI (ftp.ais.dk) for new files. Files transferred: 0",
      "stackTrace":null,
      "date":1387353901000
    }

where the important fields are 
* status: may have the values "OK" or "ERROR" 
* date: The time of logging in milliseconds since the standard base time known as "the epoch", namely January 1, 1970, 00:00:00 GMT.

At the time of writing the current services are subject to surveillance

* dk.dma.arcticweb.service.AisReplicatorJob
* dk.dma.arcticweb.filetransfer.ShapeFileMeasurerJob 
* dk.dma.arcticweb.filetransfer.DmiFtpReaderJob
* dk.dma.embryo.rest.AuthenticationService
* dk.dma.embryo.msi.MsiClientImpl
* dk.dma.embryo.service.MailServiceImpl

## Developer Logging

Developer logging is performed using SLF4J. No binding to log4j or logback exists in deployed war. Instead it depends on a suitable SLF4J binding (http://www.slf4j.org/manual.html#swapping) to be present on the classpath (with logging framework and configuration). 

JBoss Logging is configured in configuration/standalone.xml. Development environment could be setup with the following values:

    &lt;subsystem xmlns="urn:jboss:domain:logging:1.1"&gt;
        &lt;console-handler name="CONSOLE"&gt;
            &lt;level name="DEBUG"/&gt;
        &lt;/console-handler&gt;

	...

        &lt;logger category="dk.dma"&gt;
            &lt;level name="DEBUG"/&gt;
        &lt;/logger&gt;
        &lt;root-logger&gt;
            &lt;level name="DEBUG"/&gt;
            &lt;handlers&gt;
                &lt;handler name="CONSOLE"/&gt;
                &lt;handler name="FILE"/&gt;
            &lt;/handlers&gt;
        &lt;/root-logger&gt;
    &lt;/subsystem&gt;





