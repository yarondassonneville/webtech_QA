var Discussion = require('./../models/discussion');

function getAll(req, res){
    Discussion.find(function(err, messages){
        res.send(Discussion);
    });
};

module.exports.getAll = getAll;

function create(req, res){
    var m = new Discussion();
    m.user = req.body.user;
    m.discussion = req.body.discussion;

    m.save(function (err, discussion) {
        if (err) return console.error(err);
        res.send(discussion);
    });
};

module.exports.create = create;
