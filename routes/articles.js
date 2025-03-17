'use strict';

var express = require('express');
var articleController = require('../controllers/articles');
var routes = express.Router();
var token = require('../helpers/auth');

routes.post('/api/article', token.validateToken, articleController.createArticle);
routes.get('/api/articles', articleController.getAllArticles);

module.exports = routes;
