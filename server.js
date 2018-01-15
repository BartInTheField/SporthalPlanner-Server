const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/env/env');
const mongodb = require('./config/mongodb');

//routes:
const bookings = require('./api/booking.routes');
const users = require('./api/user.routes');
const openinghours = require('./api/openinghours.routes');
const dayoverview = require('./api/dayoverview.routes');
const weekoverview = require('./api/weekoverview.routes');
const closingdays = require('./api/closingdays.routes');
const sportsFacility = require('./api/sportsfacility.routes');
const customer = require('./api/customer.routes');
const staffMember = require('./api/staffmembers.routes');

const app = express();

//Door bodyParser kunnen we de body van een API request gebruiken
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.set('port', (config.env.webPort));
app.set('env', ('development'));

//CORS Headers:
app.use(function (req, res, next) {
    //Deze port mag connecten naar je server:
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/openinghours', openinghours);
app.use('/api/dayoverview', dayoverview);
app.use('/api/weekoverview', weekoverview);
app.use('/api/bookings', bookings);
app.use('/api/users', users);
app.use('/api/closingdays', closingdays);
app.use('/api/sportsfacilities', sportsFacility);
app.use('/api/customers', customer);
app.use('/api/staffmembers', staffMember);

//Default routes:
app.use('*', function(req, res) {
    res.status(400).json({
        'NotFound': 'This URL is not available'
    });
});

app.listen(config.env.webPort, function() {
    console.log('De server luistert op port: ' + app.get('port'));
});

//Als we de endpoints willen testen:
module.exports = app;
