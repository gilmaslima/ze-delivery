const express = require('express');
const bodyParser = require('body-parser');
const pdv = require('./routes/pdv.route')
const db = require('./config/db')
const log = require('./utils/log')
const handler = require('./utils/error.handler')
const app = express();

// TODO: pegar do env
let port = 1234;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/ze-delivery', app.get('/', (req, res) => { return res.sendStatus(200) }))
app.use('/ze-delivery/pdvs', pdv);
app.use(handler);


app.listen(port, () => {
    log.info(`The server is running on port number  ${port}`);

    db.once('open', () => log.info('Connected!'))
        .on('error', (error) => {
            log.error('Error : ', error);
        });


});