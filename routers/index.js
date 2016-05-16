var express = require('express');
var router = express.Router();
var controller = require('./../controllers/index');
var session = require('express-session');

var app = express();

app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

router.get('/', function (req, res) {
    var sess = session;
    if (sess.user) {
        console.log('sess.user = '+ sess.user);
        res.redirect('/discussion/all');
    } else {
        res.render('index', { title: 'Register / Log in', register: 'Registreer'});
    }
});

router.get('/login', function (req, res) {
    res.redirect('/');
});

router.get('/signup', function (req, res) {
    res.redirect('/');
});

router.get('/logout', function (req, res) {
    var sess = session;
    sess.destroy;
    res.redirect('/');
});

router.post('/signup', controller.create);

router.post('/', controller.login);

module.exports = router;
