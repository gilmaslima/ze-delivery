var expect = require('chai').expect;
var sinon = require('sinon');

var ctrl = require('../../src/controllers/pdv.controller');
var service = require('../../src/services/pdv.service');

describe('controllers/pdv.controller', function () {

    beforeEach(function() {
        sinon.stub(service, 'list');
        sinon.stub(service, 'save');
        sinon.stub(service, 'findBylngAndlat');
        sinon.stub(service, 'findById');
        
	});

    afterEach(function() {
        service.list.restore();
        service.save.restore();
        service.findBylngAndlat.restore();
        service.findById.restore();
    });
    
    const expectedModels = {
        "id": "2",
        "tradingName": "Adega Pinheiros",
        "ownerName": "Ze da Silva",
        "document": "04.433.714/0001-44",
        "coverageArea": {
           "type": "MultiPolygon",
           "coordinates": [
              [
                 [
                    [
                       -49.36837,
                       -25.42578
                    ],
                    [
                       -49.36299,
                       -25.4515
                    ]
                 ]
              ]
           ]
        },
        "address": {
           "type": "Point",
           "coordinates": [
              -49.33425,
              -25.380995
           ]
        }
     };
    

    it('should find all pdvs', function() {
		
        service.list.returns([expectedModels])
		var req = { params: { } };
		var res = {
            send: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub()
            })
		};

        ctrl.list(req, res)
        
        expect(res.send.calledWith({pdvs: [expectedModels]}))
        
	});


    it('should return http status 500 for generic error', function() {
		
		service.list.throws(new Error())
		var req = { params: { } };
		var res = {
            send: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub()
            })
		};

        ctrl.list(req, res)
        
        expect(res.status.calledWith(500))
        
	});


    it('should return http status 422 for validation error', function() {
		
		service.list.throws({name: 'ValidationError'})
		var req = { params: { } };
		var res = {
            send: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub()
            })
		};

        ctrl.list(req, res)
        
        expect(res.status.calledWith(422))
        
    });
    
    it('should save pdv and return http status 201 (created)', function() {
		
		
        service.save.returns(expectedModels)
		var req = { 
            body: expectedModels
         };

        var jsonStub = sinon.stub();
		var res = {
            status: sinon.stub().returns({
                json: jsonStub
            })
        };

        ctrl.save(req, res)
        
        expect(res.status.calledWith(201))
        expect(jsonStub.calledWith(expectedModels))
        
	});


    it('should return http status 422 for validation error on save', function() {
		
		service.save.throws({name: 'ValidationError'})
		var req = { params: { } };
		var res = {
            send: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub()
            })
		};

        ctrl.list(req, res)
        
        expect(res.status.calledWith(422))
        
    });

    it('should return http status 500 for generic error on save', function() {
		
		service.save.throws(new Error())
		var req = { params: { } };
		var res = {
            send: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub()
            })
		};

        ctrl.list(req, res)
        
        expect(res.status.calledWith(500))
        
	});


    it('should find pdv by lng and lat', function() {
		
		
        service.findBylngAndlat.returns(expectedModels)
		var req = { 
            qyery: { 
                lng: -49.36299,
                lat: -25.42515
            } 
        };
		var res = {
            send: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub()
            })
		};

        ctrl.findBylenAndlat(req, res)
        
        expect(res.send.calledWith(expectedModels))
        
	});



    it('should return http status 500 for generic error on find by lng and lat', function() {
		
		
        service.findBylngAndlat.throws(new Error())
		var req = { 
            qyery: { } 
        };
		var res = {
            send: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub()
            })
		};

        
        
        ctrl.findBylenAndlat(req, res)
        
        expect(res.send.notCalled)
        expect(res.status.calledWith(500))

	});


    it('should return http status 422 for validation error on find by lng and lat', function() {
		
		
        service.findBylngAndlat.throws({name: 'ValidationError'})
		var req = { 
            qyery: { } 
        };
		var res = {
            send: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub()
            })
		};

        
        
        ctrl.findBylenAndlat(req, res)
        
        expect(res.send.notCalled)
        expect(res.status.calledWith(422))

	});


    it('should return a pdv for a valid find by id request ', function() {
		
		
        service.findById.returns(expectedModels)
		var req = { 
            params: {id: 2}
         };

        var res = {
            send: sinon.stub(),
            status: sinon.stub()
        };

        ctrl.findById(req, res)
        
        expect(res.send.calledWith(expectedModels))
        expect(res.status.notCalled)

	});


    it('should return http status 500 for generic error on find by id request ', function() {
		
		
        service.findById.throws(new Error())
		var req = { 
            params: {id: 2}
         };

         var res = {
            send: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub()
            })
		};

        ctrl.findById(req, res)
        
        expect(res.send.notCalled)
        expect(res.status.calledWith(500))
        
	});

    it('should return http status 422 for validation error on find by id request ', function() {
		
		
        service.findById.throws({name: "ValidationError"})
		var req = { 
            params: {id: 2}
         };

         var res = {
            send: sinon.stub(),
            status: sinon.stub().returns({
                send: sinon.stub()
            })
		};

        ctrl.findById(req, res)
        
        expect(res.send.notCalled)
        expect(res.status.calledWith(422))
        
	});


})