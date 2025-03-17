'use strict';

var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Article', ArticleSchema);
