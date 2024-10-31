const Statsd = require('node-statsd');

const statsdClient = new Statsd({
    host: 'localhost',
    port: 8125,
});

module.exports = { statsdClient };