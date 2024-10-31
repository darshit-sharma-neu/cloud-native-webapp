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
const { logger } = require("../utils/logger");


router
    .route("/self/pic")
    .post(checkAuth, (req,res,next) => {
        upload.single('profilePic')(req,res,(err) => {
            if (err) {
                if (err.message === 'Only images are allowed') {
                    logger.error({ error: err.message }, "Image upload failed");
                    return res.status(400).send();
                }
                logger.error({ error: err.message }, "Image upload failed");
                return res.status(500).send();
            }
            next();
        });
    },imageController.postController)
    .get(checkAuth, imageController.getController)
    .delete(checkAuth, imageController.deleteController)
    .head(methodNotAllowedHandler)
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
