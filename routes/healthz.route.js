const router = require("express").Router();
const {
    getHandler,
    methodNotAllowedHandler,
} = require("../services/healthz.service");

/**
 * Health check endpoint
 * returns status 200 if DB connected
 * return status 503 if DB connection fails
 */
router
    .route("/")
    .get(getHandler)
    .head(methodNotAllowedHandler)
    .all(methodNotAllowedHandler);

module.exports = router;
