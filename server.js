var express = require("express");
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/mr');

require('./models/people');

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