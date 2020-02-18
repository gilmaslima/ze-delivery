const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Require the controllers
const controller = require('../controllers/pdv.controller');

router.post('/', controller.save);
router.get('/', controller.list);
router.get('/coordinates', check(["lat", "lng"], "This field is required.").exists(), controller.findBylenAndlat);
router.get('/:id', check(":id", "This field is required.").exists(), controller.findById);



module.exports = router;