const router = require("express").Router();
const {
    postController,
    getController,
} = require("../controllers/user.controller");
const { methodNotAllowedHandler } = require("../services/healthz.service");
const { checkAuth } = require("../middlewares/auth.middleware");

router
    .route("/self")
    .get(checkAuth, getController)
    .head(methodNotAllowedHandler)
    .all(methodNotAllowedHandler);

router
    .route("/")
    .post(postController)
    .head(methodNotAllowedHandler)
    .all(methodNotAllowedHandler);

module.exports = router;
