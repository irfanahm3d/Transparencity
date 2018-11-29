'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express', body: 'sometimes not a good thing to say Hello' });
});

module.exports = router;
