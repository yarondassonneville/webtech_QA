var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controller = require('./../controllers/discussion');
var session = require('express-session');
var express = require("express");
var sessFail = "sess.userID does not exist / is false.";
var sessOK = "sess.userID exists."

var app = express();

app.use(session({
  secret: 'kit kat',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

// logged in user? -> redirect
router.get('/', function(req, res){
  var sess = session;
  if (sess.userID) {
    console.log(sessOK);
    res.redirect("/discussion/all");
  } else {
    console.log(sessFail);
    res.redirect("/");
  }
});

// logged in user? -> get all discussions
router.get('/all', function(req, res){
  var sess = session;
  if (sess.userID) {
    console.log(sessOK);
    controller.getAllDiscussions(req, res);
  } else {
    console.log(sessFail);
    res.redirect("/");
  }
});

// render de create a new discussion pagina
router.get('/create', function(req, res){
  var sess = session;
  if (sess.userID) {
    console.log(sessOK);
    return res.render('discussion/create', {
      date: new Date().toDateString(),
      allDiscussions: allDiscussions
    });
  } else {
    console.log(sessFail);
    res.redirect("/");
  }
});

// get an individual discussion
router.get('/:id', function(req, res){
  var sess = session;
  if (sess.userID) {
    console.log(sessOK);
    controller.getDiscussion(req, res, req.params.id, function(callback){
      res.render('discussion/QandA', {
        topic: callback.topic
      });
    });
  } else {
  console.log(sessFail);
  res.redirect("/");
  }
});

// post a new question to the discussion
router.post('/:id', function(req, res){});


router.post('/all', controller.create);


// TODO: POST -> AJAX call

router.post('/create', controller.create);


module.exports = router;
