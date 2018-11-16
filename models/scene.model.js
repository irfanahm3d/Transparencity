'use strict';

var mongoose = require('mongoose');

const server = 'epiphany-cluster-shard-00-00-lcdgl.azure.mongodb.net:27017,epiphany-cluster-shard-00-01-lcdgl.azure.mongodb.net:27017,epiphany-cluster-shard-00-02-lcdgl.azure.mongodb.net:27017/test?ssl=true&replicaSet=epiphany-cluster-shard-0&authSource=admin&retryWrites=true';
const database = 'Transparencity';
const user = 'transparencity-admin';
const password = '5C1H6SkZqtkvInDn';

// mongodb://transparencity-admin:<PASSWORD>
//@epiphany-cluster-shard-00-00-lcdgl.azure.mongodb.net:27017,epiphany-cluster-shard-00-01-lcdgl.azure.mongodb.net:27017,
//epiphany-cluster-shard-00-02-lcdgl.azure.mongodb.net:27017/test?ssl=true&replicaSet=epiphany-cluster-shard-0&
//authSource=admin&retryWrites=true/${database}
mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`);

var SceneSchema = new mongoose.Schema({
	userId: {
		type: Number,
		required: true,
	},
	issueCategory: String,
	location:  {
		latitude: {
			type: Number
		},
		longitude: {
			type: Number
		},
		required: true
	},
	mediaPath: {
		type: String,
		required: true,
	},
	description: String
});

module.exports = mongoose.model('Scene', SceneSchema);