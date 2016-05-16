var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var controller = require('./../controllers/discussion');
var session = require('express-session');
var express = require("express");
var sessFail = "sess.userID does not exist / is false.";
var sessOK = "sess.userID exists."

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var returnRouter = function(io) {

app.use(session({
  secret: 'kit kat',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

// Mag maar 1 get/put/delete/etc afgaan denk ik
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

router.get('/create', function(req, res){
  var sess = session;
  if (sess.userID) {
    console.log(sessOK);
    return res.render('discussion/createDiscussion', {
      date: new Date().toDateString(),
      // allDiscussions: allDiscussions
    });
  } else {
    console.log(sessFail);
    res.redirect("/");
  }
});

router.get('/:id', function(req, res){
  var sess = session;
  if (sess.userID) {
    console.log(sessOK);
    sess.getTopic = req.params.id;
    console.log('sess.getTopic = ' + sess.getTopic);
    controller.getDiscussion(req, res, req.params.id);
  } else {
  console.log("sessFail");
  res.redirect("/");
  }
});


// router.post obsolete with sockets

//router.post('/all', controller.createDiscussion);

// router.post('/question', function(req, res){
//     controller.addQuestion(req, res);
// });

router.post('/answer', function(req, res){
    console.log("Create my answer");
    controller.addAnswer(req, res);
});
    
router.post('/closeDiscussion', function(req, res){
    controller.closeDiscussion(req, res);
    var sess = session;
    res.redirect("/discussion/" + sess.getTopic);
});
    
router.post('/openDiscussion', function(req, res){
    controller.openDiscussion(req, res);
    var sess = session;
    res.redirect("/discussion/" + sess.getTopic);
});

io.sockets.on('connection',function(socket){
    console.log("connection made");

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('client_addDiscussion', function (data) {
      console.log(data);
        controller.createDiscussion(data, function(newDiscussion){
          io.emit('server_newDiscussion', newDiscussion);
          console.log(newDiscussion);
        });
    });

    socket.on('client_addQuestion', function (data) {
      console.log(data);
        controller.addQuestion(data, function(newQuestion){
          io.emit('server_newQuestion', newQuestion);
          console.log("server: "+ newQuestion);
        });
    });

    socket.on('client_addAnswer', function (data) {
      console.log(data);
        controller.addAnswer(data, function(newAnswer){
          io.emit('server_newAnswer', newAnswer);
          console.log("newAnswer "+newAnswer.qID+"  " + newAnswer.answer);
        });
    });

  //

});

return router;
}
module.exports = returnRouter;
