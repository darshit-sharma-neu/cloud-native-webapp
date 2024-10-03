const router = require("express").Router();
const {
    postController,
    getController,
    putController,
} = require("../controllers/user.controller");
const { methodNotAllowedHandler } = require("../services/healthz.service");
const { checkAuth } = require("../middlewares/auth.middleware");
const { jsonBodyOnly } = require("../middlewares/jsonBodyOnly.middleware");

router
    .route("/self")
    .get(checkAuth, getController)
    .put(checkAuth, jsonBodyOnly, putController)
    .head(methodNotAllowedHandler)
    .all(methodNotAllowedHandler);

router
    .route("/")
    .post(jsonBodyOnly,postController)
    .head(methodNotAllowedHandler)
    .all(methodNotAllowedHandler);

module.exports = router;
