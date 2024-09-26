const router = require("express").Router();

router.all('/',(req, res, next) => {
    res.status(404).send();
});

module.exports = router;
