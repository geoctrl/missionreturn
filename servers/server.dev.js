var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var app     = express();

app.use(multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done=true;
    }
}));

mongoose.connect('mongodb://localhost/missionreturn');

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