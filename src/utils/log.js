const bunyan = require('bunyan');

const log = bunyan.createLogger({name: 'ze-delivery'});


module.exports = log;