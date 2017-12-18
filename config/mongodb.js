const mongoose = require('mongoose');
const config = require('./env/env');

mongoose.Promise = global.Promise;

mongoose.connect(congif.dburl);
var connection  = mongoose.connection
    .once('open', () => console.log('Geconnect met mongo: ' + config.dburl))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;