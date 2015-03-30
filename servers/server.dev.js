var express = require('express');
var multer = require('multer');
var app     = express();
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/missionreturn');
require('./../models/people');

router.use(function(req, res, next) {
    console.log('authentication/etc');
    next();
});


router.get('/api/people/:uri', function(req, res) {
    Person.findOne(req.params.uri, function(err, doc) {
        console.log(doc)
        res.send(doc)
    })
});


/**
 * application routing
 */
app.use('/', express.static('public/', {'root': __dirname + '/../'}));

router.route('/*').all(function(req, res, next) {
    res.sendFile('index.html', {'root': __dirname + '/../public/'});
});

app.use(router);

var server = app.listen(5555, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('example app listening at http://%s:%s', host, port);
});