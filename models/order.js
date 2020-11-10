const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    nameOfTheOrder: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
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
    notes: {
        type: String
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Order', orderSchema);