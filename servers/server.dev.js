var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();
var api = express();
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');

// connect to mongo db
mongoose.connect('mongodb://localhost/missionreturn');

// use cors
api.use(cors());

// uncaught exception
process.on('uncaughtException', function(err) {
    console.log(err);
});

// set secret
process.env.JWT_SECRET = 'secret';

// api root
api.use('/api', router);

// Person model
require('./../models/people');

// check 
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
            email: req.query.email,
            password: req.query.password
        }, function(err, doc) {
            if (err) {
                res.json({
                    data: "Error Occurred: " + err
                })
            } else {
                if (doc) {
                    res.json({
                        type: false,
                        data: 'user already exists'
                    })
                } else {
                    var personModel = new Person();
                    personModel.email = req.query.email;
                    personModel.password = req.query.password;
                    personModel.save(function(err, person) {
                        person.token = jwt.sign(person, process.env.JWT_SECRET)
                    })
                }
                var token  = jwt.sign({foo: 'bar'}, 'shhh');
                res.send(token)
            }
        });
        
    })
    
    .get('/people', function(req, res) {
        Person.find(function(err, doc) {
            res.json(doc);
        })
    })
    
    .get('/people/:uri', function(req, res) {
        
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

var apiServer = api.listen(5556, function() {
    console.log('api server listening at http://localhost:5556');
});

var server = app.listen(5555, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('server listening at http://localhost:5555');
});