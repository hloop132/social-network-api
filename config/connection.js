const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/social', {
    // userNewUrlParser: true,
    // userUnifiedTopology: true,
})

module.exports = connection;
