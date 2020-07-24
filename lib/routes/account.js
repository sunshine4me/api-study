const express = require('express');
var http = require('http');
const router = express.Router();
const db = require('../db');


router.post('/login', function (req, res, next) {

    db.tables.user.findOrCreate({
        where: {
            email: req.body.email
        }
    }).then(([user, created]) => {
        req.session.user = {
            id: user.id,
            email: user.email
        };
        res.status(200).end();
    }).catch(next)

});

router.get('/islogin', function (req, res, next) {
    if (req.session.user) {
        res.json(req.session.user)
    } else {
        next({
            status: 401,
            message: "未登陆"
        })
    }

});


module.exports = router;
