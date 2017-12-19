//User routes
var express = require('express');
var routes = express.Router();

var jwt = require('jwt-simple')
var conf = require('../config/env/env')
var secret = conf.secret;

var mongodb = require('../config/mongodb');
var User = require('../model/user.model');


//Ophalen van alle users:
routes.get('/', function(req, res, next) {
    User.find({})
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(next);
});

//Ophalen van 1 user:
routes.get('/:id', function(req, res, next) {
    const id = req.params.id;
    User.findOne({_id:id})
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(next);
});

//Inloggen
routes.post('/auth', function(req, res, next) {
    const usernamePar = req.body.username;
    const passwordPar = req.body.password;

    User.findOne({
        username: usernamePar
    },function (err,user) {
        if(err)throw err;
        if(!user){
            res.status(401).json({message:'Wrong username/password combination'});
        } else if (user) {
            if(user.password != passwordPar) {
                res.status(401).json({message:'Wrong username/password combination'});
            } else {
                var token = jwt.encode(user,secret);

                res.status(200).json({user: user, token: token});
            }
        }
    })
});

//Regristreren (Alleen server-side):
routes.post('/', function(req, res, next) {
    const userReq = req.body;
    User.create(userReq)
        .then(user => res.status(200).send(user))
        .catch(next);
});

//Updaten van een user:
routes.put('/:id', function(req, res, next) {
    const id = req.params.id;
    const user = req.body;
    User.findByIdAndUpdate({_id: id},user)
        .then(() => User.findByIdAndUpdate({_id: id}))
        .then(user => res.status(200).send(user))
        .catch(next);
});

//Verwijderen van een user:
routes.delete('/:id', function(req, res, next) {
    const id = req.params.id;

    User.findByIdAndRemove({_id: id})
        .then(user => res.send(user))
        .catch(next);
}); 

module.exports = routes;