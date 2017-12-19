//User routes
var express = require('express');
var routes = express.Router();

var jwt = require('jwt-simple')
var conf = require('../config/env/env')
var secret = conf.secret;

const bcrypt = require('bcrypt');


var mongodb = require('../config/mongodb');
var User = require('../model/user.model');


//Ophalen van alle users:
routes.get('/', function(req, res) {
    User.find({})
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(401).json({message:'Error'})
            console.log(error);
        });
});

//Ophalen van 1 user:
routes.get('/:id', function(req, res) {
    const id = req.params.id;
    User.findOne({_id:id})
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(401).json({message:'Error'})
            console.log(error);
        });
});

//Inloggen
routes.post('/auth', function(req, res) {
    const usernamePar = req.body.username;
    const passwordPar = req.body.password;

    User.findOne({
        username: usernamePar
    },function (err,user) {
        if(err)throw err;
        if(!user){
            res.status(401).json({message:'Wrong username/password combination'});
        } else if (user) {
            if(bcrypt.compareSync(passwordPar,user.password)) {
                var token = jwt.encode(user,secret);

                res.status(200).json({user: user, token: token});
            } else {
                res.status(401).json({message:'Wrong username/password combination'});
            }
        }
    })
});

//Regristreren (Alleen server-side):
routes.post('/', function(req, res) {
    let hash = bcrypt.hashSync(req.body.password,10);

    req.body.password = hash;
    const userReq = req.body;
    console.log(req.body);

    User.create(userReq)
        .then(user => res.status(200).send(user))
        .catch(error => {
            res.status(401).json({message:'Error'})
            console.log(error);
        });
});

//Updaten van een user:
routes.put('/:id', function(req, res) {
    const id = req.params.id;
    const user = req.body;
    User.findByIdAndUpdate({_id: id},user)
        .then(() => User.findByIdAndUpdate({_id: id}))
        .then(user => res.status(200).send(user))
        .catch(error => {
            res.status(401).json({message:'Error'})
            console.log(error);
        });
});

//Verwijderen van een user:
routes.delete('/:id', function(req, res) {
    const id = req.params.id;

    User.findByIdAndRemove({_id: id})
        .then(user => res.send(user))
        .catch(error => {
            res.status(401).json({message:'Error'})
            console.log(error);
        });
}); 

module.exports = routes;