'use strict';
var express = require('express');
var router = express.Router();
var SceneModel = require('../models/scene.model');

/* GET scene by id. */
router.get('/scene', function (req, res) {
    if (!req.body.id) {
        return res.status(400).send('Missing URL parameter: id');
    }

    SceneModel.findOne({
        _id: req.body.id
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

/* 
 * Create a new scene
 * POST scene 
*/
router.post('/scene', function (req, res) {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    if (!req.body.userId || !req.body.issueCategory || !req.body.location || !req.body.mediaPath) {
        return res.status(400).send('Missing parameters: userId, issueCategory, location and mediaPath');
    }

    var model = new SceneModel(req.body);
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
