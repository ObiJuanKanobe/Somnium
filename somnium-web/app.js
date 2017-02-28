
var path = require('path');

//Routes' JS file vars
var routes = require('./routes/index');
var users = require('./routes/users');
var registration = require('./routes/userRegistration')
var charities = require('./routes/charities');
var news = require('./routes/news');
var about = require('./routes/about');

//Packages
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

var port = 3000;

//App Use

app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/', routes);
app.use('/users', users);
app.use('/registration', registration)

//App Set

//FILLER

//App Get

app.get('/',function(req, res){    
    var file = path.join(__dirname,'views/index.html');
    res.sendFile(file);
});

//App Listener

app.listen(port,function(){
    console.log('Listening on port ' + port);
});

//
//Dev and Production error handling
//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    res.render('error', {
    message: err.message,
    error: err
    });
  });
}

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // render the error page
    res.status(err.status || 500);

    res.render('error', {
    message: err.message,
    error: {}
    });
});