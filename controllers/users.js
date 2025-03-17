'use strict';

var User = require('../models/user');
var token = require('../helpers/auth');
var bcrypt = require('bcryptjs');

function createUser(req, resp) {
    var parameters = req.body;
    var salt = bcrypt.genSaltSync(15);

    var newUser = new User();
    newUser.username = parameters.username;
    newUser.password = bcrypt.hashSync(parameters.password, salt);
    newUser.rol = parameters.rol;

    newUser.save().then(
        () => {
            resp.status(200).send({ 'message': 'User created successfully' });
        },
        err => {
            resp.status(500).send({ 'message': 'An error occurred while creating the user', 'error': err });
        }
    );
}

function loginUser(req, resp) {
    var parameters = req.body;

    User.findOne({ 'username': parameters.username }).then(
        (userFound) => {
            if (userFound == null) {
                resp.status(403).send({ 'message': 'User not found' });
            }
            if (bcrypt.compareSync(parameters.password, userFound.password)) {
                resp.status(200).send({ 'message': 'Login successful', 'token': token.generateToken(userFound) });
            } else {
                resp.status(403).send({ 'message': 'Invalid login' });
            }
        },
        err => {
            resp.status(500).send({ 'message': 'An error occurred while validating the user', 'error': err });
        }
    );
}

module.exports = { createUser, loginUser };
