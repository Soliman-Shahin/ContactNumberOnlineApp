const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Contact } = require('../models/contact.model');

// view all contacts
router.get('/', (req, res) => {
    Contact.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retrieving Contacts : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// view one contact
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    Contact.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retrieving Contact : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// create new contact
router.post('/create', (req, res) => {
    var contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        notes: req.body.notes
    });
    contact.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Contact Save : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// update contact
router.put('/update/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var contact = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        notes: req.body.notes
    };
    Contact.findByIdAndUpdate(req.params.id, {
        $set: contact
    }, {
        new: true
    }, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Contact Update : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// delete contact
router.delete('/delete/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Contact.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Contact Delete : ' + JSON.stringify(err, undefined, 2));
        }
    })
});

module.exports = router;