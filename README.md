Arctic
=========

A tool for ships sailing in the Arctic region around Greenland. Arctic serves as a single access point to safety related information, provides streamlined reporting and allows for voluntary coordinated voyage through sharing of positions and planned routes.

The live system can be found here: https://arcticweb.e-navigation.net

## Software Architecture

The Arctic client is a rich client HTML/JS-application with a server side JSON webservice API.
The server is a Java EE 7 application.

On the client side we use:

* JavaScript/HTML
* OpenLayers (for maps)
* Twitter Bootstrap (for basic layout)
* AngularJS (for forms and similar)
* HTML5 Application Cache
* Node and Grunt (for building)
* Karma and PhantomJS (for unit testing)
* JQuery (to be removed in the future)

On the server side we use:

* Java 8
* Maven (for building)
* EJB3.1/JPA(Hibernate) (for persistance)
* CDI/JSR330 (for dependency injection)
* Resteasy (for JSON-webservices)
* Shiro (for security)
* Apache CXF (for SOAP-webservices)
* JUnit (for unit-test)
* Mockito (for mocking)

## Prerequisites ##

* Java JDK 1.8
* Maven 3.x
* Wildfly 8.2 (Maven setup to deploy to Wildfly)
* MySQL (Maven configures JBoss datasource to use MySQL)
* Node.js (Follow the installation instructions at http://nodejs.org)
* Grunt.js (Follow the installation instructions at http://gruntjs.com)
* CouchDB
* a file called arcticweb.properties


## Server side code
This project mainly contains the web side code executed in the browser client. All server side executed
logic (web, services and data access) is maintained in the [Enav-Services](https://github.com/maritime-web/Enav-Services) Github project.
Most of it is developed as Java code and included in the war-file produced by this project as .jar artifacts.

## User manual
The [user manual](https://github.com/maritime-web/arcticweb-usermanual) is a separate web application maintained in a separate Github project.
The user manual is included in the war produced by this project using the overlays configuration in the maven-war-plugin.

## Continuous integration and deployment

The master branch is build and testet continuously by Jenkins
https://dma.ci.cloudbees.com/view/MaritimeWeb/job/Arctic-branch-master/

Other branches of Arctic may also have been configured for continuous integration on Jenkins.
If so they will be available in the list of build jobs: https://dma.ci.cloudbees.com/view/MaritimeWeb/

## Initial setup

Wildfly should be installed using the install script provided in this repository. install-wildfly.sh. Remember to add a admin user using 

    $ chmod +x install-wildfly.sh 
    $ ./install-wildfly.sh
    $ ./wildfly-8.2.0.Final/bin/add-user.sh 

As root in MySQL - create a database and a user for Arctic:

    create database embryo;
    create user 'embryo'@'localhost' identified by 'embryo';
    grant all on embryo.* to 'embryo'@'localhost';
    
You might need to configure the MySQL database to accept large packet sizes. This can be done in the mysql configuration file my.cnf
depending on OS it might be located in /etc/mysql/my.cnf

    [mysqld]
    max_allowed_packet=16M

### Configure WildFly ###
Arctic has a default configuration file which may be overridden by setting the system property "arcticweb.configuration" to the URI of an external configuration file. For example put the following in your JBOSS standalone.xml-file:

    <system-properties>
        <property name="arcticweb.configuration" value="file:///Users/chvid/sfs/arcticweb.properties"/>
    </system-properties>

In particular the file may contain URLs and passwords for the DMI Ice map server.

    $ ./wildfly-8.2.0.Final/bin/standalone.sh 


## Building ##

    mvn clean install


## Deploy to Wildfly

Initial deployment (Clean, build, install database drivers environmental variables and deploy application)

    embryo-web> mvn install -P fulldeploy

    or 

    Embryo> mvn install -P fulldeploy

Daily deployment

    embryo-web> mvn jboss-as:deploy - just build and deploy the WAR-file

    or 

    Embryo> mvn install -P deploy - build the whole application and deploy WAR-file

A local deployment will setup Arctic at the following URL:

    http://localhost:8080/

To setup test users and data you must first login with dma/qwerty and thereafter push the button at the following URL

    http://localhost:8080/testdata.html

Thereafter you can login with orasila/qwerty, oratank/qwerty, dmi/qwerty, etc. 

## Instant reload of web resources

Grunt has been setup to run a livereload server, which enables instant reload of static web resources (html, css, js, images) upon saving them. Go to the embryo-web folder and execute

    grunt server

Then visit the url: http://localhost:9000

You will now be able to test/see changes to static web resources almost instantly. 

(All REST http calls are proxied to the JBoss server installation at port 8080). 

## Checkstyle

See https://github.com/dma-dk/dma-developers

## JSLint

Execute the following Maven command to lint your JavaScript files:

    mvn jslint4java:lint


## JavaScript Unit Test

JavaScript may be tested using Node.js, NPM, Grunt and Karma. Follow this blog (http://jespertejlgaard.blogspot.dk/2013/08/installing-nodejs-npm-and-karma-on.html) to install Node.js and NPM, but leave out Karma  (at least on Linux) Install Grunt:

    sudo npm install -g karma

JS unit tests are performed in PhantomJS as part of the Maven build in the Maven test phase. 
 
The unit tests can however also be executed by a Karma server, which will discover changes in the project JavaScript files and execute all JS unit tests. The Karma server is started by executing 

    embryo-web$ grunt karma:unit

It will by default execute all JS Unit Tests in PhantomJS, Chrome and Firefox.

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

https://arcticweb-test.e-navigation.net


## CI Test Server - Latest and Greatest

The CI server continuously deploys the latest and greatest to a separate test server:

https://arcticweb-alpha.e-navigation.net (requires credentials only available to development team)


## Scheduled Jobs
The application contains a number of scheduled jobs responsible for fetching data from external systems or for calculating necessary values. These jboss are described below.

* dk.dma.embryo.vessel.job.AisReplicatorJob : This job replicates data from the external AIS server to Arctic on regular schedule configured in the property embryo.vessel.aisjob.cron. The data is keeped in memory. Data might therefore not be available immidiately after a server/application (re)start.
* dk.dma.embryo.vessel.job.MaxSpeedJob : This job fetches a vessels route during the past 5 days from the AIS server and calculates the maximum speed for each vessel during those 5 days. Data is keeped in memory. 
* dk.dma.embryo.dataformats.job.DmiFtpReaderJob : This jobs transfers ice chart shape files from an FTP server to a folder in the operating system, which Arctic is installed on. See property embryo.iceChart.dmi.localDirectory. The job will only transfer files not already transfered. Ice charts are not available to users before measured by dk.dma.arcticweb.filetransfer.ShapeFileMeasurerJob.
* dk.dma.embryo.dataformats.job.AariHttpReaderJob: This jobs transfers ice chart shape files from a HTTP server to a folder in the operating system, which Arctic is installed on. See property embryo.iceChart.aari.localDirectory. The job will only transfer files not already transfered. Ice charts are not available to users before measured by dk.dma.arcticweb.filetransfer.ShapeFileMeasurerJob.
* dk.dma.embryo.dataformats.job.ShapeFileMeasurerJob : This job collects all shape files in the file system, measure their sizes and repopulates the database table ShapeFileMeasurements. The job will only measure new files.
* dk.dma.embryo.dataformats.inshore.DmiInshoreIceReportJob: This jobs transfers inshore ice report files from an FTP server to a folder in the operating system, which Arctic is installed on. See property embryo.inshoreIceReport.dmi.localDirectory. The job will only transfer latest files.
* dk.dma.embryo.weather.service.DmiWeatherJob : This job transfers weather forecasts and warnings (XML files) from DMIs FTP server to the file system.
* dk.dma.embryo.dataformats.job.FcooFtpReaderJob : This job transfers FCOO forecast data (NetCDF) from FTP server to local file system
* dk.dma.embryo.dataformats.ForecastParserJob: This job parses forecast files received from different providers.
* dk.dma.embryo.tiles.service.TilerJob : This job deletes old tile set related files from the file system (georeference image file, log files, tiles) as well as deletes and creates TileSet entries in database.
* dk.dma.embryo.tiles.service.TilerServiceBean : This is started by TilerJob to generate a tile set from a georeferenced image file
* dk.dma.embryo.tiles.service.DmiSatelliteJob : This job transfers georeferenced images from FTP server to local file system


## Surveillance

The application contains a number of integrations with external systems. These may be either jobs running at different schedules or HTTP calls directly to the external system. The success rate of the integration executions are logged in the application database and can be retrieved using a public REST call. 

Names of the integration jobs/services of can be retrieved calling the URL:

    http(s)://host/rest/log/services

The latest log entry of a specific job/service can be retrieved by the URL

    http(s)://host/rest/log/latest?service=dk.dma.arcticweb.filetransfer.DmiFtpReaderJob

where dk.dma.arcticweb.filetransfer.DmiFtpReaderJob is the job name. This will return a JSON response in the format

    {
      "service":"dk.dma.embryo.dataformats.job.DmiFtpReaderJob",
      "status":"OK",
      "message":"Scanned DMI (ftp.ais.dk) for new files. Files transferred: 0",
      "stackTrace":null,
      "date":1387353901000
    }

where the important fields are 
* status: may have the values "OK" or "ERROR" 
* date: The time of logging in milliseconds since the standard base time known as "the epoch", namely January 1, 1970, 00:00:00 GMT.

At the time of writing the current services are subject to surveillance

* dk.dma.embryo.vessel.job.AisReplicatorJob
* dk.dma.embryo.vessel.service.AisDataServiceImpl
* dk.dma.embryo.vessel.job.MaxSpeedJob
* dk.dma.embryo.dataformats.job.ShapeFileMeasurerJob.dmi 
* dk.dma.embryo.dataformats.job.DmiFtpReaderJob
* dk.dma.embryo.dataformats.inshore.DmiInshoreIceReportJob
* dk.dma.embryo.dataformats.service.ForecastServiceImpl
* dk.dma.embryo.weather.service.DmiWeatherJob
* dk.dma.embryo.user.json.AuthenticationService
* dk.dma.enav.services.nwnm.NwNmService
* dk.dma.embryo.common.mail.MailServiceImpl
* dk.dma.embryo.metoc.service.MetocServiceImpl
* dk.dma.embryo.dataformats.job.FcooFtpReaderJob
* dk.dma.embryo.tiles.service.TilerJob
* dk.dma.embryo.tiles.service.TilerServiceBean
* dk.dma.embryo.tiles.service.DmiSatelliteJob