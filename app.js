const express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    // path = require(''),
    faviconURL = __dirname+'/public/img/node-favicon.png',
    publicDir = express.static(__dirname+'/public'),
    viewDir = __dirname+'/views',
    port = ( process.env.PORT || 3000 ),
    app = express(),
    // reportRouter = require('./routes/reportsRouter'),
    // userRouter = require('./routes/usersRouter'),
    dapartmentRouter = require('./routes/departmentRouter')
;

// let report = require('./routes/reports');

// view engine setup
app.set('views', viewDir);
// app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.set('port',port);

app.use(favicon(faviconURL));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(publicDir);

// app.use('/reports',reportRouter);
// app.use('/users',userRouter);
app.use('/departments',dapartmentRouter);

module.exports = app;