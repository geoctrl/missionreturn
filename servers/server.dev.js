var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/missionreturn');

process.on('uncaughtException', function(err) {
    console.log(err);
});

process.env.JWT_SECRET = 'secret';

// api root
app.use('/api', router);

// Person model
require('./../models/people');

function ensureAuth(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["auth"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.json({'err': 403});
    }
}

router
    .post('/login', function(req, res) {
        Person.findOne({'token': req.params.token}, function(err, person) {
            if (err) {
                
            } else {
                if (!person) {
                    
                } else {
                    
                }
            }
        });
        
        res.send('hey hey hey')
        
    })
    .post('/people', function(req, res) {
        Person.findOne({
            email: req.params.email,
            password: req.params.password
        }, function(err, person) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error Occurred: " + err
                })
            } else {
                if (person) {
                    res.json({
                        type: false,
                        data: "Error Occurred: User already Exists!"
                    })
                } else {
                    var personModel = new Person();
                    personModel.email = req.params.email;
                    personModel.password = req.params.password;
                    personModel.save(function(err, person) {
                        person.token = jwt.sign(person, process.env.JWT_SECRET)
                    })
                }
                var token  = jwt.sign({foo: 'bar'}, 'shhh');
                res.send(token)
            }
        });
        
    })
    
    .get('/people/:uri', ensureAuth, function(req, res) {
        
        Person.findOne({'uri': req.params.uri}, function(err, person) {
            if (err) {
                console.log(err);
            } else {
                res.json(person);
            }
        });
    });

//router.get('/api/')


/**
 * application routing
 */
app.use('/', express.static('public/', {'root': __dirname + '/../'}));

app.route('/*').all(function(req, res, next) {
    res.sendFile('index.html', {'root': __dirname + '/../public/'});
});

app.use(router);

var server = app.listen(5555, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('example app listening at http://%s:%s', host, port);
});