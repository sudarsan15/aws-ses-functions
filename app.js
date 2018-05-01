/*
	Author 	 : Sudarsan PS
	Website  : www.sudarsanps.com

*/

var express = require('express');

require('./shared/shared');

var index = require('./routes/index');
var verifyemail = require('./routes/verifyemail');
var dashboard = require('./routes/dashboard');
var verifydomain = require('./routes/verifydomain');
var sendemail = require('./routes/sendemail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret  : 'epkbqGF9qNp4QqgyRuJX4bKjtwqdg',
  expires : new Date(Date.now() + 3600000),
  resave  : false,
  saveUninitialized : true,
}));
app.use(flash());

//To disable x-powered-by details in header
app.disable('x-powered-by');
app.use(helmet());
app.use(helmet.noCache())
app.use(helmet.frameguard())


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use(csrf());
app.use('/verifyemail', verifyemail);
app.use('/verifydomain', verifydomain);
app.use('/dashboard', dashboard);
app.use('/sendemail', sendemail);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
