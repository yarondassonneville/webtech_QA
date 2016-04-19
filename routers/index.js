var express = require('express');
var router = express.Router();
var controller = require('./../controllers/index');

router.get('/', function (req, res) {
    res.render('index', { title: 'Register / Log in', register: 'Registreer'});
    // Deze 2 regels kunnen niet tegelijkertijd afgaan 
    // res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/login', function (req, res) {
    res.redirect('/');
});

router.get('/signup', function (req, res) {
    res.redirect('/');
});

router.post('/signup', controller.create);

router.post('/', controller.login);

module.exports = router;
