var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controller = require('./../controllers/discussion');
var session = require('express-session');
var express = require("express");

var app = express();

app.use(session({
  secret: 'keyboard cat', 
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

// Mag maar 1 get/put/delete/etc afgaan denk ik
router.get('/', function(req, res){
    var sess = session;
    if (sess.user) { 
        console.log("yesssss");
        res.redirect("/discussion/all");
    } else {
      console.log("IT isn't working");
        res.redirect("/");
    }
});

router.get('/all', function(req, res){
    var sess = session;
    if (sess.user) { 
        console.log("Logged in");
        controller.getAll(req, res);
    } else {
      console.log("IT isn't working");
        res.redirect("/");
    }
});

router.get('/:id', function(req, res){
    res.send("GET discussion with id " + req.params.id);
});

router.post('/all', controller.create);

router.put('/:id', function(req, res){
    res.send("PUT discussion with id " + req.params.id);
});

router.delete('/:id', function(req, res){
    res.send("DELETE discussion with id " + req.params.id);
});

module.exports = router;
