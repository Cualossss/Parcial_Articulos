'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var routesUser = require('./routes/users');
var routesArticle = require('./routes/articles');

var application = express();

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));
application.use(routesUser);
application.use(routesArticle);

module.exports = application;
