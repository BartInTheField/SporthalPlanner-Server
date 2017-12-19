/**e
 * Created by Felix on 19-12-2017.
 */

var querystring = require('querystring');
var https = require('https');

var host = 'http://localhost:55512/'; //checken of deze port geldig blijft

function performRequest(endpoint, method, data, success) {
    const dataString = JSON.stringify(data);
    let headers = {};

    if (method == 'GET') {
        endpoint += '?' + querystring.stringify(data);
    }
    else {
        headers = {
            'Content-Type': 'application/json',
            'Content-Length': dataString.length
        };
    }
    const options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers
    };

    const req = https.request(options, function(res) {
        res.setEncoding('utf-8');

        let responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            console.log(responseString);
            const responseObject = JSON.parse(responseString);
            success(responseObject);
        });
    });

    req.write(dataString);
    req.end();
}

module.exports = performRequest();