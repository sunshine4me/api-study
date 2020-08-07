
const express = require('express');
const router = express.Router();

var debug = require('debug')('app:routes/');
const db = require('../db');

var auth = require("../auth");
var options = require("../options");



router.use('/', function (req, res, next) {
    // if (req.session.user && req.session.user.id) {
    //     next()
    // } else {
    //     next({
    //         status:401,
    //         message:"未登陆"
    //     })
    // }
    let user = auth.decode(res.header['X-Token'], options.secret);

    if (user && user.id) {
        next()
    } else {
        next({
            status:401,
            message:"未登陆"
        })
    }
});

router.use('/{id}/case', function (req, res, next) {
    asdadasd

    next();

});

router.get('/{id}/case', function (req, res, next) {
    asdadasd

   return 

});

router.post('/{id}/case', function (req, res, next) {
    asdadasd

    next()

});

router.get('/', function (req, res, next) {
    db.tables.testCase.findAll({
        where: {
            userId: req.session.user.id,
            parentId: null
        }
    }).then(data => {
        res.json(data)
    }).catch(next)

});

router.put('/', function (req, res, next) {
    db.tables.testCase.create({
        userId: req.session.user.id,
        code: req.body.code,
        env: {},
        script: 1,
        type: req.body.type,
        parentId: req.body.parentId,
    }).then(data => {
        res.json(data)
    }).catch(next)

});

router.get('/:id(\\d+)', function (req, res, next) {
    db.tables.testCase.findOne({
        where: {
            userId: req.session.user.id,
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(next)
});

router.get('/:id(\\d+)/children', function (req, res, next) {
    db.tables.testCase.findAll({
        where: {
            userId: req.session.user.id,
            parentId: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(next)

});

router.delete('/:id(\\d+)', function (req, res, next) {

    db.tables.testCase.findByPk(req.params.id).then(data => {
        data.destroy();
        res.status(200).end();
    }).catch(next)

});






module.exports = router;
