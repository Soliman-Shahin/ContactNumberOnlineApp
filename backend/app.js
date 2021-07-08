const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./config/db');
const contactController = require('./controllers/contact.controller');
const userController = require('./controllers/user.controller');

var port = 3000;

// bring app
const app = express();

// bring cors
app.use(cors());

// bring body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// bring pages routes
app.use('/contacts', contactController);
app.use('/user', userController);

// listing to port
app.listen(port, () => {
    console.log('Server is listening on port: http://localhost:' + port);
})