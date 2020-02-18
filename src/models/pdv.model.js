const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


let PdvSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    tradingName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true,
        index: { unique: true }
    },
    coverageArea: {
        type: {
            type: String,
            enum: ['MultiPolygon'],
            required: true
        },
        coordinates: {
            type: Array,
            index: '2d',
            required: true
        }
    }
    ,
    address: {
        type: {
            type: String,
            enum: ['Point'],
            require: true
        },
        coordinates: {
            type: Array,
            required: true,
            index: '1d'
        }
    }
})


PdvSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Pdv', PdvSchema);