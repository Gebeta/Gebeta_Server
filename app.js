var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('express-jwt');
var session = require('express-session');
var cors = require('cors')

const mongoose = require('./config/mongoose');
const { jwt_key,session_key } = require('./config/vars');
const {routes} = require('./config/routes')

var item = require('./routes/items');
var auth = require('./routes/auth');
var image = require('./routes/images')

var app = express();

mongoose.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt({ secret: jwt_key, algorithms: ['HS256']})
.unless({path: routes.public}));

app.use(session({
  secret: session_key,
  resave: false,
  saveUninitialized: true
}))

app.use('/items', item);
app.use('/images', image);
app.use('/auth',auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;
