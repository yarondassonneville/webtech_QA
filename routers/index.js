var express = require('express');
var router = express.Router();
var controller = require('./../controllers/index');

router.get('/', function (req, res) {
    res.render('index', { title: 'Register / Log in', register: 'Registreer'});
    // Deze 2 regels kunnen niet tegelijkertijd afgaan 
    // res.json({ message: 'hooray! welcome to our api!' });

});

router.post('/signup', controller.create);

router.post('/login', controller.login);

module.exports = router;
