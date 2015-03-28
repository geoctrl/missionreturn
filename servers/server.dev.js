var express = require("express");
var livereload = require("express-livereload");
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/mr');

require('./../models/people');

app.use('/', express.static(__dirname + '/public'));

app.get('/api/people', function(req, res) {
    Person.findOne(function(err, doc) {
            res.send(doc)
    })
});

var server = app.listen(5555, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('example app listening at http://%s:%s', host, port);
});

var router = express.Router();
router.route('/*').all(function(req, res, next) {
    if(req.originalUrl.indexOf('.') === -1) {
        res.sendFile(__dirname + '/public/index.html');
    }
    else {
        next();
    }
});

app.use(router);

livereload(app);