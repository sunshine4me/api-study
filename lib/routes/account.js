const express = require('express');
var http = require('http');
const router = express.Router();
const db = require('../db');
var auth = require("../auth");

var options = require("../options");

router.post('/login', function (req, res, next) {

    db.tables.user.findOrCreate({
        where: {
            username: req.body.username
        }
    }).then(([user, created]) => {
        const token = auth.encode({ id: user.id, name: user.username })
        res.json({ token })
    }).catch(next)

});

router.get('/user', function (req, res, next) {
    res.json(req.user)
});

router.post('/logout', function (req, res, next) {
    res.status(200).end();
});


module.exports = router;
