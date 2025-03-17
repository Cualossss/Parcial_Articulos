'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');

var secret = 'Ksdnwa!!8923shaduSAKDOEUYSB';

function generateToken(user) {
    var payload = {
        sub: user._id,
        username: user.username,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(10, 'minutes').unix()
    };

    return jwt.encode(payload, secret);
}

function validateToken(req, resp, nextStep) {
    try {
        var userToken = req.headers.authorization;
        var cleanToken = userToken.replace('Bearer ', '');
        var payload = jwt.decode(cleanToken, secret);

        req.headers.userId = payload.sub;
        req.headers.userRol = payload.rol;
        nextStep();
    } catch (ex) {
        resp.status(403).send({ message: 'Invalid Token' });
    }
}

module.exports = { generateToken, validateToken };
