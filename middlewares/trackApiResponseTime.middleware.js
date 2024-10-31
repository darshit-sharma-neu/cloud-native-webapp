const { statsdClient } = require('../utils/statsd');

async function trackApiResponseTime(req,res,next) {
    const start = Date.now();
    const route = `${req.method}.${req.baseUrl}${req.path}`;

    res.on("finish", () => {
        const duration = Date.now() - start;
        statsdClient.timing(`api.${route}.processing_time`, duration);
    });

    next();
}

module.exports = {
    trackApiResponseTime
} 