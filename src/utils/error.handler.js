const log = require('./log')

function handle(e, res){

    if(e.name == 'ValidationError'){
        log.error(e);
        res.status(422).send(JSON.stringify(e))
    } else {
        log.error(e);
        res.status(500).send(JSON.stringify(e))
    }

}

module.exports = handle;