const Pdv = require('../models/pdv.model');
const service = require('../services/pdv.service');
const log = require('../utils/log');
const { validationResult } = require('express-validator');


async function save(req, res, next) {

    try {
        const result = await service.save(req.body)
        log.info(`Data ${result} saved.`)
        res.status(201).json(result)
    } catch (e) {
        next(e);
    }


}

async function list(req, res, next) {
    try {
        const result = await service.list();

        log.info(`Retrieving data ${result}`);
        res.send({ pdvs: result });
    } catch (e) {
        next(e);
    }

};

async function findByLngAndLat(req, res, next) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            log.error(`Invalid request ${JSON.stringify(req.query)}`);
            return res.status(422).jsonp(errors.array());
        }
        const result = await service.findBylngAndlat(req.query.lng, req.query.lat);
        log.info(`Retrieving data ${result}`);
        res.send(result);

    } catch (e) {
        next(e);
    }
}

async function findById(req, res, next) {
    try {
        const id = req.params['id'];

        if (id) {
            const result = await service.findById(id);
            log.info(`Retrieving data ${result}`);
            res.send(result);
        }


    } catch (e) {
        next(e);
    }
}



module.exports = { list, findByLngAndLat: findByLngAndLat, save, findById }