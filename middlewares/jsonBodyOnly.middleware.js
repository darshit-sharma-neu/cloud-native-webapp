const { Request, Response, NextFunction } = require("express");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function jsonBodyOnly(req, res, next) {

    const queryParamsLen = req.query ? Object.keys(req.query).length : 0
    if (
        (req.headers["content-type"] &&
        req.headers["content-type"] != "application/json") ||
        queryParamsLen != 0
    ) {
        res.status(400).send();
        return;
    }
    next();
}

module.exports = {
    jsonBodyOnly
}
