var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var Kioscos=require('./routes/Kioscos');
var app = express();

// view for back-end
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// config server
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());

// config resources folder
app.use(express.static(path.join(__dirname, 'public')));


//config api route
app.use('/api/Kioscos', Kioscos);


// ------- error handlers -------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
