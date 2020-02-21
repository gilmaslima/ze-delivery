
ze-delivery
============================

## Overview
Rest API for create and search partners


## Technology chosen

Language:
* NodeJs

Project dependencies:
* Express - Used to serve rest endpoints.
* Mongoose - Object modeling for NodeJs.
* bunyan - Used for log output.
* express-validator - used for request parameters validation.
* mongoose-unique-validator - for Mongodb constraint validator.
  
Test dependencies:
* Mocha - Used to run tests.
* Mochawesome - Used to generate a test scenario´s report.
* Nyc - generate a coverage report
* Sinon - Provide spies and stubs functionalities.
* Chai - Provide assert validation for each test.

Data base:
* MongoDB - Was chosed because provide an easy way to store and retrieve GeoJson objects.


How to install:
* Go to mongo/ directory and run:<br>
<code>docker build -t ze-mongo .</code>

* Run the following command:<br>
<code>
docker run -d --name ze-mongo  -p 27017:27017 ze-mongo
</code>

* Go to / (root directory) and run:<br>
<code>docker build -t ze-app .</code>

* Run the following command:<br>
<code>
docker create --name ze-app -p 3000:3000 ze-app
</code>

* Run the following command to create a network:<br> 
<code>
docker network create ze-network
</code>

* Add containers to network with the follow command:<br>
<code>
docker network connect ze-network ze-mongo
</code>
<br>
<code>
docker network connect ze-network ze-app
</code>

* To start application run: <br>
<code>
docker start ze-app
</code>

* Other commands to do some troubleshoot<br>
* To see network status and attached containers:
<br>
<code>
docker network inspect ze-network
</code>

<br>

* To test connectivity between containers:<br>
<code>

docker exec -ti ze-app ping ze-mongo
</code>


## Application layers
The application has the following structure:

* ``src`` - root directory:<br>

[app.js](https://github.com/gilmaslima/ze-delivery/blob/master/src/app.js) - Intialize application.

* ``src/controllers`` - in that directory are the Rest Controller files:<br>
  
- [pdv.controller.js](https://github.com/gilmaslima/ze-delivery/blob/master/src/controllers/pdv.controller.js)
>- function save<br>
  > provides the endpoint rest POST /pdvs
  > request example: <br><code>
  > {
  >        "id": "1",
  >        "tradingName": "Adega Osasco",
  >        "ownerName": "Ze da Ambev",
  >        "document": "02.453.716/000170",
  >        "coverageArea": {
  >           "type": "MultiPolygon",
  >           "coordinates": [
  >              [
  >                 [
  >                    [
  >                       -43.36556,
  >                       -22.99669
  >                    ],
  >                    [
  >                       -43.36539,
  >                       -23.01928
  >                    ],
  >                    [
  >                       -43.26583,
  >                       -23.01802
  >                    ],
  >                    [
  >                       -43.25724,
  >                       -23.00649
  >                    ],
  >                    [
  >                       -43.23355,
  >                       -23.00127
  >                    ],
  >                    [
  >                       -43.2381,
  >                       -22.99716
  >                    ],
  >                    [
  >                       -43.23866,
  >                       -22.99649
  >                    ],
  >                    [
  >                       -43.24063,
  >                       -22.99756
  >                    ],
  >                    [
  >                       -43.24634,
  >                       -22.99736
  >                    ],
  >                    [
  >                       -43.24677,
  >                       -22.99606
  >                    ],
  >                    [
  >                       -43.24067,
  >                       -22.99381
  >                    ],
  >                    [
  >                 ]
  >              ]
  >           ]
  >        },
  >        "address": {
  >           "type": "Point",
  >           "coordinates": [
  >              -43.297337,
  >              -23.013538
  >           ]
  >        }
  >     }  </code>
  
  >  
  > Possible response status:
  >* HTTP 201 created.
  >* HTTP 422 if this pdv is already registered.
  >* HTTP 500 when there is an unexpected application error.

>- function list<br>
  > makes the endpoint available GET /pdvs.
  > request example: 
  > {host:port}/ze-delivery/pdvs
  >  
  > Response example: <br><code>
  > {
    "pdvs": [
  > {
  >        "id": "1",
  >        "tradingName": "Adega Osasco",
  >        "ownerName": "Ze da Ambev",
  >        "document": "02.453.716/000170",
  >        "coverageArea": {
  >           "type": "MultiPolygon",
  >           "coordinates": [
  >              [
  >                 [
  >                    [
  >                       -43.36556,
  >                       -22.99669
  >                    ],
  >                    [
  >                       -43.36539,
  >                       -23.01928
  >                    ],
  >                    [
  >                       -43.26583,
  >                       -23.01802
  >                    ],
  >                    [
  >                       -43.25724,
  >                       -23.00649
  >                    ],
  >                    [
  >                       -43.23355,
  >                       -23.00127
  >                    ],
  >                    [
  >                       -43.2381,
  >                       -22.99716
  >                    ],
  >                    [
  >                       -43.23866,
  >                       -22.99649
  >                    ],
  >                    [
  >                       -43.24063,
  >                       -22.99756
  >                    ],
  >                    [
  >                       -43.24634,
  >                       -22.99736
  >                    ],
  >                    [
  >                       -43.24677,
  >                       -22.99606
  >                    ],
  >                    [
  >                       -43.24067,
  >                       -22.99381
  >                    ],
  >                    [
  >                 ]
  >              ]
  >           ]
  >        },
  >        "address": {
  >           "type": "Point",
  >           "coordinates": [
  >              -43.297337,
  >              -23.013538
  >           ]
  >        }
  >    }]}  </code>
  >
  >
  > Possible response status
  >* HTTP 200 Ok
  >* HTTP 500 when there is an unexpected application error.

>- function findById<br>
  > makes the endpoint available GET /pdvs/{id}
  > request example: 
  > {{host:port}}/ze-delivery/pdvs/1
  >
  >  
  >  
  > response example: <br> <code>
  > {
  >        "id": "1",
  >        "tradingName": "Adega Osasco",
  >        "ownerName": "Ze da Ambev",
  >        "document": "02.453.716/000170",
  >        "coverageArea": {
  >           "type": "MultiPolygon",
  >           "coordinates": [
  >              [
  >                 [
  >                    [
  >                       -43.36556,
  >                       -22.99669
  >                    ],
  >                    [
  >                       -43.36539,
  >                       -23.01928
  >                    ],
  >                    [
  >                       -43.26583,
  >                       -23.01802
  >                    ],
  >                    [
  >                       -43.25724,
  >                       -23.00649
  >                    ],
  >                    [
  >                       -43.23355,
  >                       -23.00127
  >                    ],
  >                    [
  >                       -43.2381,
  >                       -22.99716
  >                    ],
  >                    [
  >                       -43.23866,
  >                       -22.99649
  >                    ],
  >                    [
  >                       -43.24063,
  >                       -22.99756
  >                    ],
  >                    [
  >                       -43.24634,
  >                       -22.99736
  >                    ],
  >                    [
  >                       -43.24677,
  >                       -22.99606
  >                    ],
  >                    [
  >                       -43.24067,
  >                       -22.99381
  >                    ],
  >                    [
  >                 ]
  >              ]
  >           ]
  >        },
  >        "address": {
  >           "type": "Point",
  >           "coordinates": [
  >              -43.297337,
  >              -23.013538
  >           ]
  >        }
  >     }  </code>
  
  >
  > Possible response status:
  >* HTTP 200 Ok
  >* HTTP 500 when there is an unexpected application error.

>- function findByLngAndLat<br>
  > makes the endpoint available GET 
  > request example: {{host:port}}/ze-delivery/pdvs/coordinates?lng=-43.36556&lat=-22.99669
  >  
  > response example: <br> <code>
  > {
  >        "id": "1",
  >        "tradingName": "Adega Osasco",
  >        "ownerName": "Ze da Ambev",
  >        "document": "02.453.716/000170",
  >        "coverageArea": {
  >           "type": "MultiPolygon",
  >           "coordinates": [
  >              [
  >                 [
  >                    [
  >                       -43.36556,
  >                       -22.99669
  >                    ],
  >                    [
  >                       -43.36539,
  >                       -23.01928
  >                    ],
  >                    [
  >                       -43.26583,
  >                       -23.01802
  >                    ],
  >                    [
  >                       -43.25724,
  >                       -23.00649
  >                    ],
  >                    [
  >                       -43.23355,
  >                       -23.00127
  >                    ],
  >                    [
  >                       -43.2381,
  >                       -22.99716
  >                    ],
  >                    [
  >                       -43.23866,
  >                       -22.99649
  >                    ],
  >                    [
  >                       -43.24063,
  >                       -22.99756
  >                    ],
  >                    [
  >                       -43.24634,
  >                       -22.99736
  >                    ],
  >                    [
  >                       -43.24677,
  >                       -22.99606
  >                    ],
  >                    [
  >                       -43.24067,
  >                       -22.99381
  >                    ],
  >                    [
  >                 ]
  >              ]
  >           ]
  >        },
  >        "address": {
  >           "type": "Point",
  >           "coordinates": [
  >              -43.297337,
  >              -23.013538
  >           ]
  >        }
  >     }  </code>
  >
  > Possible response status:
  >
  >* HTTP 200 Ok
  >* HTTP 500 when there is an unexpected application error.
  
* ``src/services`` - path with the service layer, business logic and database access:<br>
[pdv.service.js](https://github.com/gilmaslima/ze-delivery/blob/master/src/services/pdv.service.js) - provide functions for save and retrieve pdvs.

* ``src/utils`` - path with the utilities used in application.<br>
[error.handler.js](https://github.com/gilmaslima/ze-delivery/blob/master/src/utils/error.handler.js) - Error handler used to prepare response. 
[log.js](https://github.com/gilmaslima/ze-delivery/blob/master/src/utils/log.js) - Log utility.

* ``src/models`` - in this directory are the classes that represent the objects of database entities:<br>
[pdv.model.js](https://github.com/gilmaslima/ze-delivery/blob/master/src/models/pdv.model.js) - Pdv model schema.

* ``src/routes`` - Path with the application route mapping:<br>
[pdv.route.js](https://github.com/gilmaslima/ze-delivery/blob/master/src/routes/pdv.route.js) - Mapping route for pdv controller.


## Application configuration

* ``src/config`` - application configuration path:
  
[db.js](https://github.com/gilmaslima/ze-delivery/blob/master/src/config/db.js) - Responsible for initializing the connection to the database.


