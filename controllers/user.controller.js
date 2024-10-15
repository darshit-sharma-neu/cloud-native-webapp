const { Request, Response, NextFunction } = require("express");
const { create, getByEmail, update } = require("../services/user.service");
const logger = require("../utils/logger");
const { checkConnection } = require("../utils/databaseConnector");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function postController(req, res, next) {
    try {
        if (!(await checkConnection())) {
            res.status(503).send();
            return;
        }
        const requiredFields = ["first_name", "last_name", "email", "password"];
        const inputFields = req.body ? Object.keys(req.body) : [];
        if (
            inputFields.length == 0 ||
            !inputFields.every((field) => requiredFields.includes(field))
        ) {
            res.status(200).send();
            return;
        }
        if(!req.body.password){
            res.status(400).send();
            return;
        }
        const userInfo = req.body;
        const user = await create(userInfo);
        const { password, ...userResponse } = user;
        res.status(201).send(userResponse);
    } catch (e) {
        if (
            e.name == "SequelizeValidationError" ||
            e.name == "SequelizeUniqueConstraintError"
        ) {
            res.status(400).send();
        } else {
            res.status(500).send();
            logger.error(e.message);
        }
    }
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function getController(req, res, next) {
    try {
        const contentLenght = req.get("Content-Length");
        const queryLenght = Object.keys(req.query).length;
        if (contentLenght || queryLenght) {
            res.status(400).send();
            return;
        }
        const { email } = req.userContext;
        const { password, ...userInfo } = await getByEmail(email);
        res.status(200).send(userInfo);
    } catch (error) {
        logger.error(error.message);
        res.status(500).send();
    }
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function putController(req, res, next) {
    try {
        const allowedFields = ["first_name", "last_name", "password"];
        const inputFields = req.body ? Object.keys(req.body) : [];
        if (
            inputFields.length == 0 ||
            !inputFields.every((field) => allowedFields.includes(field))
        ) {
            res.status(400).send();
        } else {
            const { email } = req.userContext;
            await update(email, req.body);
            res.status(204).send();
        }
    } catch (error) {
        logger.error(error.message);
        res.status(500).send();
    }
}

module.exports = {
    postController,
    getController,
    putController,
};
