const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:5000/ze-delivery', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;




module.exports = db;