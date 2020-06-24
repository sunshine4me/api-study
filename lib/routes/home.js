
const express = require('express');
const router = express.Router();

var debug = require('debug')('app:routes/');





router.get('/', function (req, res, next) {
    res.json({ a: 1 })

});

module.exports = router;
