var express = require('express');
var router = express.Router();
var controller = require('./../controllers/discussion');

router.get('/', controller.getAll);
    
router.get('/:id', function(req, res){
    res.send("GET discussion with id " + req.params.id);
});

router.post('/create', controller.create);

router.put('/:id', function(req, res){
    res.send("PUT discussion with id " + req.params.id);
});

router.delete('/:id', function(req, res){
    res.send("DELETE discussion with id " + req.params.id);
});

module.exports = router;