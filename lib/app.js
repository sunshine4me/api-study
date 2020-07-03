var createError = require('http-errors');
var express = require('express');
var cookieSession = require('cookie-session');
var path = require('path');
var logger = require('morgan');
const createDebug = require('debug')
var debug = createDebug('app:*' + `  [${new Date().toISOString()}]`);


module.exports = function () {

    var app = express();

    // view engine setup
    //   app.set('views', path.join(__dirname, 'views'));
    //   app.set('view engine', 'vash');


    app.use(logger('dev'));
    app.use(cookieSession({
        name: "jwt",
        keys: "sunjianping",
        maxAge: 24 * 60 * 60 * 1000 * 7 //24 * 7hours
    }));

    app.use(express.json({ limit: '5mb', extended: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

 

  

    app.use('/home', require('./routes/home'));



    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    // error handler
    app.use(function (error, req, res, next) {
        var err;
        if (error.errors) {
            err = error.errors[0];
        } else {
            err = error;
        }
        debug(err)
        var body = {};
        body.code = err.status || 500;
        body.message = err.message;
        // render the error page
        res.status(body.code).json(body);
    });
   
    return app;
}
