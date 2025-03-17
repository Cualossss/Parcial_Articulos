'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { 
        type: String, 
        required: true, 
        enum: { 
            values: ['admin', 'estándar'], 
            message: '{VALUE} is not a valid role'
        } 
    }
    
});

module.exports = mongoose.model('User', UserSchema);
