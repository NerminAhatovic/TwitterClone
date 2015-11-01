// include express module
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var User = require('./src/routes/user');
var Tweet = require('./src/routes/tweet');

// create a webserver
var app = express();

// set NODE_ENV default to development if not otherwise specified on server
if (!app.get('env'))
  app.set('env', 'development');

var assertPath = app.get('env') == 'production' ? 'dist' : 'public';

// setup session
app.use(session({
  secret: 'twitterclonesecret',
  resave: false,
  saveUninitialized: false}));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// set default assert path
app.use(express.static(__dirname + '/' + assertPath));

app.get('/', function(req, res) {
    // store default userid in session
    // in real application this would be done after successful login
    if (!req.session.userid) {
      console.log('storing userid into req.session');
      req.session.userid = 1;
    }

    res.sendFile(__dirname + '/' + assertPath + '/index.html');
});
app.get('/users', User.getAll);
app.get('/users/:id', User.getUser);
app.get('/logged_user', User.getUser);
app.get('/tweets', Tweet.getAll);
app.post('/insert_tweet', Tweet.create);

var server = app.listen(3000, '127.0.0.1', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server running at http://%s:%s', host, port);
});
