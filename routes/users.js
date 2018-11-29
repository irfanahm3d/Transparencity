﻿'use strict';
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.model');

/* GET user by name. */
router.get('/user', function (req, res) {
    if (!req.body.userId) {
        return res.status(400).send('Missing URL parameter: userId');
    }

    UserModel.findOne({
            userId: req.body.userId
        })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

/* 
 * Create a new user
 * POST user 
*/
router.post('/user', function (req, res) {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    if (!req.body.userId || !req.body.name || !req.body.email) {
        return res.status(400).send('Missing parameters: userId, name and email');
    }

    var model = new UserModel(req.body);
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }

            res.status(201).send(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
