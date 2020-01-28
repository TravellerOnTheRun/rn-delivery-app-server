const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const callSchema = new Schema({
    name: {
        type: String,
        required: true
    },
	contactData: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
	timezone: {
        type: String,
        required: true
    },
	additonalInfo: {
        type: String
    },
});

module.exports = mongoose.model('Call', callSchema);