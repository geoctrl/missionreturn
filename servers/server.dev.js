var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();
var api = express();
var router = express.Router();
var mongoose = require('mongoose');
var cors = require('cors');
var mailer = require('./mailer');
var crypto = require('crypto');
var _ = require('underscore');


// connect to mongo db and add models
mongoose.connect('mongodb://localhost/missionreturn');
require('./../models/people');

// api setup
api.use('/api', router);
router.use(cors());

// uncaught exception
process.on('uncaughtException', function(err) {
    console.log(err);
});

// set secret
process.env.JWT_SECRET = 'secret';

function encryptData(text) {
    var cipher = crypto.createCipher('aes-256-ctr', text);
    var crypted = cipher.update(process.env.JWT_SECRET, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// check 
function ensureAuth(req, res, next) {
    var token = req.headers.token;
    if (token.length && token!==undefined) {
        req.token = token;
        next(); 
    } else {
        res.status(401);
        res.json({'error': 'not-authorized'});
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
            email: req.query.email
        }, function(err, doc) {
            if (err) {
                res.json({error: "Error Occurred: " + err})
            } else {
                if (doc) {
                    res.status(200);
                    res.json({
                        error: 'Email is already in use.'
                    })
                } else {
                    var personModel = new Person();
                    personModel.email = req.query.email;
                    personModel.password = encryptData(req.query.password);
                    personModel.token = jwt.sign({email: personModel.email}, process.env.JWT_SECRET, {
                        expiresInMinutes: 1440
                    });
                    
                    personModel.save(function(err, person) {
                        res.status(200);
                        res.json(person);

                        // send auth email
                        mailer.mailer.authorizeAccount(personModel.email);
                    });
                }
            }
        });
        
    })
    
    // does not require token auth
    // needs to be accessible to general public
    .get('/people', function(req, res) {
        var requestParams = {};
        if (req.query.email) {
            requestParams.email = req.query.email;
        }
        if (req.query.uri) {
            requestParams.uri = req.query.uri;
        }
        
        if (req.headers.token && !_.size(requestParams)) {
            Person.findOne({token: req.headers.token} ,function(err, doc) {
                console.log('here')
                if (err) {
                    console.log(err);
                } else {
                    if (doc) {
                        res.status(200);
                        res.json(doc);
                    } else {
                        res.status(404);
                        res.json({
                            error: "User doesn't exist"
                        });
                    }
                }
            })
        } else if (_.size(requestParams)) {
            Person.findOne(requestParams, function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    if (doc) {
                        res.status(200);
                        res.json(doc);
                    } else {
                        res.status(404);
                        res.json({
                            error: "User doesn't exist"
                        });
                    }
                }
            });
        } else {
            res.status(400);
            res.json({
                error: 'invalid request'
            })
        }
    })
    .get('/token', function(req, res) {
        Person.findOne({token: req.headers.token}, function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                if (doc) {

                } else {
                    res.status(404);
                    res.json({
                        error: "Token doesn't exist"
                    });
                }
            }
        })
    });


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