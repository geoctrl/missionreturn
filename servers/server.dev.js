var express = require('express');
var app     = express();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/mr');

require('./../models/people');

app.use('/', express.static('public/', {'root': __dirname + '/../'}));

app.get('/api/people', function(req, res) {
    Person.findOne(function(err, doc) {
        res.send(doc)
    })
});

var router = express.Router();
router.route('/*').all(function(req, res, next) {
    res.sendFile('index.html', {'root': __dirname + '/../public/'});
});

app.use(router);

var server = app.listen(5555, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('example app listening at http://%s:%s', host, port);
});