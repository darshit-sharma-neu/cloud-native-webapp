const Statsd = require('node-statsd');

const statsdClient = new Statsd({
    host: 'localhost',
    port: 8125,
});


function countApiCalls(req, res, next) {
    const route = req.baseUrl || req.path; 
    statsdClient.increment(`api.calls.${route}`);
    next();
}

module.exports = {
    countApiCalls, statsdClient
}