'use strict';

var mongoose = require('mongoose');

const server = 'epiphany-cluster-lcdgl.azure.mongodb.net';
const database = 'Transparencity';
const user = 'transparencity-admin';
const password = '5C1H6SkZqtkvInDn';

// mongodb+srv://transparencity-admin:<PASSWORD>@epiphany-cluster-lcdgl.azure.mongodb.net/test?retryWrites=true
mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true`, { useNewUrlParser: true });

var UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('User', UserSchema);