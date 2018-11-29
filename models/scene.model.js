'use strict';

var mongoose = require('mongoose');

const server = 'epiphany-cluster-lcdgl.azure.mongodb.net';
const database = 'Transparencity';
const user = 'transparencity-admin';
const password = '5C1H6SkZqtkvInDn';

// mongodb+srv://transparencity-admin:<PASSWORD>@epiphany-cluster-lcdgl.azure.mongodb.net/test?
mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true`);

var objectId = mongoose.Types.ObjectId;

var LocationSchema = new mongoose.Schema({
    latitide: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

mongoose.model('location', LocationSchema);

var SceneSchema = new mongoose.Schema({
	userId: {
		type: Number,
		required: true,
	},
	issueCategory: String,
    location: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'location',
		required: true
	},
	mediaPath: {
		type: String,
		required: true,
	},
	description: String
});

module.exports = mongoose.model('Scene', SceneSchema);