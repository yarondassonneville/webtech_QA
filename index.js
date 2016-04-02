var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require("multer");
var jade = require('jade');

mongoose.connect('mongodb://localhost/qanda');

var app = express();
app.set('view engine', 'jade');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer); // for parsing multipart/form-data

app.use('/', require('./routers/index'));
app.use('/discussion', require('./routers/discussion'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
