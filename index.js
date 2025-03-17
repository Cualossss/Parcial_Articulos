'use strict';

var mongoose = require('mongoose');
var application = require('./application');

mongoose.connect('mongodb://localhost:27017/Parcial1').then(
    () => {
        console.log("Database connection successful. Starting application");
        application.listen(3000, function(){
            console.log("Application started");
        });
    },
    function(err) {
        console.log("Error when connecting to database. Application not started. " + err);
    }
);