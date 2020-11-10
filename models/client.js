const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    },
	linkToWebsite: {
        type: String,
        required: true
    },
	name: {
        type: String,
        required: true
    },
	character: {
        type: String,
        required: true
    },
	subscribtion: {
        type: String,
        required: true
    },
	email_subsribtion: {
        type: String,
        required: true
    },
	contactData: {
        type: String,
        required: true
    },
	moneyTransaction: {
        type: String,
        required: true
    },
	projects: {
        type: String,
        required: true
    },
	satisfactionRate:{
        type: String,
        required: true
    } 
});

module.exports = mongoose.model('Client', clientSchema);