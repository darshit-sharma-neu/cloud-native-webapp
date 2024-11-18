const { Request, Response, NextFunction } = require("express");
const { getTokenByUserEmail, checkTokenValidity} = require("../services/verification.service");
const userService = require("../services/user.service");
const {logger} = require("../utils/logger");
const { checkConnection } = require("../utils/databaseConnector");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function getController(req, res, next) {
    try {
        if (!(await checkConnection())) {
            res.status(503).send();
            return;
        }
        // get userEmail
        const userEmail = req.query.email;
        if(!userEmail){
            res.status(400).send();
            return;
        }
        if(!req.query.token){
            res.status(400).send();
            return;
        }
        // get verification record
        let verificationRecord = await getTokenByUserEmail(userEmail);
        if(!verificationRecord){
            res.status(404).send();
            return;
        }

        // check if user already verified
        if((await userService.isVerified(userEmail))){
            res.status(409).send();
            return;
        }
        verificationRecord  = verificationRecord.toJSON();
        // check token validity
        const tokenValidity = await checkTokenValidity(verificationRecord, req.query.token);
        if(tokenValidity.invalid){
            res.status(400).send();
            return;
        }
        if(tokenValidity.timeout){
            res.status(410).send();
            return;
        }
        
        // Validate User
        await userService.validateUser(userEmail, verificationRecord.token);

        res.status(200).send();
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

module.exports = {
    getController
}