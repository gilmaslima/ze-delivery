const express = require('express');
const bodyParser = require('body-parser');
const pdv = require('./routes/pdv.route')
const db = require('./config/db')
const log = require('./utils/log')

const app = express();

// TODO: pegar do env
let port = 1234;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/pdvs', pdv);



//db.on('error', log.error.bind(log, 'MongoDB connection error:'));

app.listen(port, () => {
    log.info(`The server is running on port number  ${port}`);
    //db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    //db.on('error', log.error.bind(log, 'MongoDB connection error:'));

    db.once('open', () => log.info('Connected!'))
        .on('error', (error) => {
            log.error('Error : ', error);
        });


});