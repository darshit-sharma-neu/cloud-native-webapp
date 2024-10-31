const {logger} = require('../utils/logger');

function checkJsonValidity(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        logger.error("Invalid JSON");
        return res.status(400).send();
    }
    next;
}

module.exports = { checkJsonValidity };
