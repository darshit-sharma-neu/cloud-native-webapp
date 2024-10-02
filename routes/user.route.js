const router = require("express").Router();

const {
    postController
} = require("../controllers/user.controller");
const { methodNotAllowedHandler } = require('../services/healthz.service');
const logger = require("../utils/logger");
/**
 * Health check endpoint
 * returns status 200 if DB connected
 * return status 503 if DB connection fails
 */
router
    .route("/")
    .post(postController)
    .head(methodNotAllowedHandler)
    .all(methodNotAllowedHandler);

module.exports = router;
