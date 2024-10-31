const router = require("express").Router();
const {
    postController,
    getController,
    putController,
} = require("../controllers/user.controller");
const imageController = require("../controllers/profileImage.controller");
const { methodNotAllowedHandler } = require("../services/healthz.service");
const { checkAuth } = require("../middlewares/auth.middleware");
const { jsonBodyOnly } = require("../middlewares/jsonBodyOnly.middleware");
const { upload } = require("../middlewares/fileUpload.middleware");


router
    .route("/self/pic")
    .post(checkAuth, upload.single('image') ,imageController.postController)
    .get(checkAuth, imageController.getController)
    .delete(checkAuth, imageController.deleteController)
    .all(methodNotAllowedHandler);
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
