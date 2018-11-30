'use strict';
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.model');

/* 
 * Retrieve a user
 * GET user by userId
 */
router.get('/user/id', function (req, res) {
    if (!req.body.userId) {
        return res.status(400).send('Missing URL parameter: userId');
    }

    UserModel.findOne({ userId: req.body.userId })
        .then(doc => { res.json(doc); })
        .catch(err => { res.status(500).json(err); });
});

/* 
 * Retrieve a user
 * GET user by email
 */
router.get('/user/email', function (req, res) {
    if (!req.body.email) {
        return res.status(400).send('Missing URL parameter: email');
    }

    UserModel.findOne({ email: req.body.email })
        .then(doc => { res.json(doc); })
        .catch(err => { res.status(500).json(err); });
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

/*
 * Update a user
 * PUT user
 */
router.put('/user', function (req, res) {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    if (!req.body.userId) {
        return res.status(400).send('Missing parameter: userId');
    }

    UserModel.findOneAndUpdate(
        { userId: req.body.userId },
        req.body,
        { new: true },
        function (err, doc) {
            if (err) {
                return res.status(500).send(err);
            }

            res.status(200).send(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
