const mongoose = require('mongoose');
const config = require('./env/env');

mongoose.Promise = global.Promise;

mongoose.connect(congif.dburl)