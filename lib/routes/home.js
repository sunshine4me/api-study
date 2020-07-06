
const express = require('express');
const router = express.Router();

var debug = require('debug')('app:routes/');


const run = require('../run');


router.get('/', function (req, res, next) {
    res.json({ a: 1 })

});

router.post('/', function (req, res, next) {


    run(req.body.code, req.body.env).then(result => {
        res.send(result)
    }).catch(next)
});

module.exports = router;
