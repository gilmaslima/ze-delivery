var expect = require('chai').expect;
var sinon = require('sinon');


const Pdv = require('../../src/models/pdv.model')
const service = require('../../src/services/pdv.service')

describe('controllers/pdv.controller', function () {


    beforeEach(function () {
        sinon.stub(Pdv, 'find');
        sinon.stub(Pdv, 'findOne');
    });

    afterEach(function () {
        Pdv.find.restore();
        Pdv.findOne.restore();
    });


    const expectedModels = {
        "_id": "5e48afc42483926f8c94a25b",
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


    it('should find all pdvs', function () {

        Pdv.find.returns([expectedModels])

        const result = service.list();


        expect(result.id == expectedModels.id)
        expect(result._id == undefined)
        expect(Pdv.find.calledWith({}))

    });


    it('should save pdv', function () {


        var obj = {
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

        var pdv = new Pdv(obj)

        sinon.stub(pdv, 'save');

        pdv.save.returns(expectedModels)

        const result = service.save(obj);


        expect(result == expectedModels)
        expect(result._id)
        expect(pdv.save.calledWith({ runValidators: true, context: 'query' }))

    });


    it('should find pdv by lng and lat', function () {

        Pdv.findOne.returns(expectedModels);

        const result = service.findBylngAndlat(-49.33425, -25.380995);


        expect(result.id == expectedModels.id)
        expect(result._id == undefined)
        expect(Pdv.findOne.calledOnce)

    });


    it('should return a pdv on find by id', function () {

        Pdv.findOne.returns(expectedModels);

        var id = 2;
        const result = service.findById(id);


        expect(result.id == expectedModels.id)
        expect(result._id == undefined)
        expect(Pdv.findOne.calledWith({ id: id }))

    });

})
