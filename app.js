const express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    faviconURL = __dirname+'/public/img/node-favicon.png',
    publicDir = express.static(__dirname+'/public'),
    viewDir = __dirname+'/views',
    port = ( process.env.PORT || 3000 ),
    app = express(),
    report = require('./routes/reports'),
    user = require('./routes/users')
;

// let report = require('./routes/reports');

// view engine setup
app.set('views', viewDir);
app.set('view engine', 'pug');
app.set('port',port);

app.use(favicon(faviconURL));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(publicDir);

app.use('/reports',report);
app.use('/users',user);

module.exports = app;