const log = require('./log')

function handler(e, req, res, next){

    if(e.name == 'ValidationError'){
        log.error(e);
        res.status(422).send(JSON.stringify(e))
    } else {
        log.error(e);
        res.status(500).send(JSON.stringify(e))
    }
    next();
}

module.exports = handler;