const bunyan = require('bunyan');
//TODO: pegar do enviroenment
const log = bunyan.createLogger({name: 'ze-delivery'});


module.exports = log;