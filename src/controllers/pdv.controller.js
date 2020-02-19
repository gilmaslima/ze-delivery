const Pdv = require('../models/pdv.model');
const service = require('../services/pdv.service');
const log = require('../utils/log');
const { validationResult } = require('express-validator');
const handle = require('../utils/error.handler');


function save(req, res) {

    try {
        const result = service.save(req.body)
        log.info(`Data ${result} saved.`)
        res.status(201).json(result)
    } catch (e) {
        return handle(e, res);
    }


}

function list(req, res) {
    try {
        const result = service.list();

        log.info(`Retrieving data ${result}`);
        res.send({ pdvs: result });
    } catch (e) {
        return handle(e, res);
    }

};

function findByLngAndLat(req, res) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            log.error(`Invalid request ${JSON.stringify(req.query)}`);
            return res.status(422).jsonp(errors.array());
        }
        const result = service.findBylngAndlat(req.query.lng, req.query.lat);
        log.info(`Retrieving data ${result}`);
        res.send(result);

    } catch (e) {
        return handle(e, res);
    }
}

function findById(req, res) {
    try {
        const id = req.params['id'];

        if (id) {
            const result = service.findById(id);
            log.info(`Retrieving data ${result}`);
            res.send(result);
        }


    } catch (e) {
        return handle(e, res);
    }
}



module.exports = { list, findByLngAndLat: findByLngAndLat, save, findById }