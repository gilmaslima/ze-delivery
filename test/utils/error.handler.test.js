var sinon = require('sinon');
var expect = require('chai').expect;

const handle = require('../../src/utils/error.handler')


describe('utils/error.handler', function () {


    let res = {
        status: sinon.stub().returns({
            send: sinon.stub()
        })
    }



    it('Should return http status code 500 for generic error', function () {
        var error = new Error();
        handle(error, res)
        expect(res.status.calledWith(500)).to.equal(true);
    });

    it('Should return http status code 422 for validation error', function () {
        var error = {
            name: "ValidationError"
        };
        handle(error, res)
        expect(res.status.calledWith(422)).to.equal(true);
    });


})