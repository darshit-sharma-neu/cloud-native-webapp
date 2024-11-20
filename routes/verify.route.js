const router = require("express").Router();
const { getController } = require("../controllers/verification.controller");
const { methodNotAllowedHandler } = require("../services/healthz.service");



router
    .route("/")
    .get(getController)
    .head(methodNotAllowedHandler)
    .all(methodNotAllowedHandler);


module.exports = router;
