var express = require('express');
var router = express.Router();
var authController = require('./../../controllers/auth');

module.exports = function (app) {

    router.post('/login',authController.login);
    router.post('/register',authController.register);

    app.use('/auth',router);

};