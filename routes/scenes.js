'use strict';
var express = require('express');
var router = express.Router();
var SceneModel = require('../models/scene.model');

/*
 * GET all scenes.
 * Limit to 10
 * TODO: paging of data
 */
router.get('', function (req, res) {
    SceneModel.find()
        .limit(10)
        .then(docs => { res.json(docs); })
        .catch(err => { res.status(500).json(err); });
});

/*
 * GET scene by id.
 */
router.get('/scene/id', function (req, res) {
    if (!req.body.id) {
        return res.status(400).send('Missing URL parameter: id');
    }

    SceneModel.findOne({ _id: req.body.id })
        .then(doc => { res.json(doc); })
        .catch(err => { res.status(500).json(err); });
});

/*
 * GET scenes by userId.
 */
router.get('/userId', function (req, res) {
    if (!req.body.userId) {
        return res.status(400).send('Missing URL parameter: userId');
    }

    SceneModel.find({ userId: req.body.userId })
        .then(docs => { res.json(docs); })
        .catch(err => { res.status(500).json(err); });
});

/*
 * GET scenes by issueCategory.
 */
router.get('/issueCategory', function (req, res) {
    if (!req.body.issueCategory) {
        return res.status(400).send('Missing URL parameter: issueCategory');
    }

    SceneModel.find({ issueCategory: req.body.issueCategory })
        .then(docs => { res.json(docs); })
        .catch(err => { res.status(500).json(err); });
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

/*
 * Update a scene
 * PUT scene
 */
router.put('/scene', function (req, res) {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    if (!req.body.sceneId) {
        return res.status(400).send('Missing parameter: sceneId');
    }

    SceneModel.findOneAndUpdate(
        { _id: req.body.sceneId },
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
