const { statsdClient } = require("../utils/statsd");
function countApiCalls(req, res, next) {
    const route = req.baseUrl || req.path;
    statsdClient.increment(`api.calls.${route}`);
    next();
}

module.exports = {
    countApiCalls
};
