const Pdv = require('../models/pdv.model')
const log = require('../utils/log')


async function save(obj) {

    obj.address.coordinates = [-43.297337, -23.013538]
    
    var pdv = new Pdv(
        obj
    );

    const result = await pdv.save({ runValidators: true, context: 'query' });

    return parseObj(result);

};


async function list() {

    const result = await Pdv.find({});

    return result.map(r => {

        return parseObj(r);

    })


}

async function findBylngAndlat(lng, lat) {
    
    const result = await Pdv.findOne({
        coverageArea: {
            $geoIntersects: {
                $geometry: {
                    type: "Point", coordinates: [lng, lat]
                }
            }
        }
    })
    
    return parseObj(result);
}


async function findById(id) {

    const result = await Pdv.findOne({ id: id })
    
    return parseObj(result);
}


function parseObj(r) {

    log.info(`Parsing object ${r}`);

    return {

        id: r.id,
        tradingName: r.tradingName,
        ownerName: r.ownerName,
        document: r.document,
        coverageArea: r.coverageArea,
        address: r.address

    }


}

module.exports = { save, list, findById, findBylngAndlat }
