const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ContactNumbers', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true },
    (err) => {
        if (!err)
            console.log('Database Connected Successfully ...');
        else
            console.log('Error in Database connection : ' + JSON.stringify(err, undefined, 2));
    });

module.exports = mongoose;