const express = require('express');
var router = express.Router();

var { User } = require('../models/user.model');


// add new user
router.post('/signup', (req, res) => {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in User Save : ' + JSON.stringify(err, undefined, 2));
        }
    });
});


// login with two users (username: user1, password: user1),(username: user2, password: user2)
router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username === "user1" && password === "user1") {
        res.send('login successfully');
    } else if (username === "user2" && password === "user2") {
        res.send('login successfully');
    } else(err) => {
        return err;
    }
});

module.exports = router;