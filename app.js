const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');



const app = express();
app.use(cors());




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

require('./app/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const error = {
    error: {
      code: 500,
      message: '',
      status: '',
      details: []
    }
  };


  switch (err.constructor.name) {
    case 'Errors':
      error.error.code = 400;
      error.error.details = err.errors;
      error.error.message = 'validation errors';
      break;
    case 'Error':
      error.error.code = 500;
      error.error.details = err.errors;
      error.error.message = 'something wrong';
      console.log(err);
      break;
    case 'ClientError':
      error.error.code = 404;
      error.error.details = err.errors;
      error.error.message = err.message;
      break;

  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(error.error.code);
  res.json(error);
});

module.exports = app;
