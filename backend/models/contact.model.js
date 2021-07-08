const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    _UserId: {
        type: mongoose.Types.ObjectId
    },
    notes: {
        type: String
    }
})

const Contact = mongoose.model('Contact', ContactSchema, 'Contacts');

module.exports = { Contact }