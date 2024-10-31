const { logger } = require("../utils/logger");

function requestLogger(req, res, next) {
    const { method, url, headers, query, body } = req;
    const startTime = Date.now();

    logger.info(
        {
            method,
            url,
        },
        "Incoming request"
    );

    res.on("finish", () => {
        const duration = Date.now() - startTime;
        logger.info(
            {
                method,
                url,
                statusCode: res.statusCode,
                duration: `${duration}ms`,
            },
            "Request completed"
        );
    });

    next();
}

module.exports = {
    requestLogger,
};
