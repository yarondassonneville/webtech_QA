var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { title: 'Hey', discussion: 'Hello there!'});
    // Deze 2 regels kunnen niet tegelijkertijd afgaan 
    // res.json({ message: 'hooray! welcome to our api!' });

});

module.exports = router;
