'use strict';

var Article = require("../models/article");

function createArticle(req, resp) {
    if (req.headers.userRol !== 'admin') {
        return resp.status(403).send({ 'message': 'Unauthorized action' });
    }

    var articleReqBody = req.body;
    var newArticle = new Article();
    newArticle.title = articleReqBody.title;
    newArticle.description = articleReqBody.description;
    newArticle.price = articleReqBody.price;

    if (!newArticle.title || !newArticle.description || newArticle.price <= 0) {
        return resp.status(400).send({ 'message': 'One or more required variables were not sent' });
    }

    newArticle.save().then(
        (savedArticle) => {
            resp.status(200).send({ 'message': 'Article was created successfully', 'article': savedArticle });
        },
        err => {
            resp.status(500).send({ 'message': 'An error occurred while creating the article', 'error': err });
        }
    );
}


function getAllArticles(req, resp) {
    Article.find({}).then(
        (foundArticles) => {
            resp.status(200).send({ 'articles': foundArticles });
        },
        err => {
            resp.status(500).send({ 'message': 'An error occurred while searching for articles', 'error': err });
        }
    );
}

module.exports = { createArticle, getAllArticles };
