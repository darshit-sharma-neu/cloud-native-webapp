const { Request, Response, NextFunction } = require('express')
const { create } = require('../services/user.service');
const logger = require('../utils/logger');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function postController(req, res, next){
    try{
        const userInfo = req.body;
        const user = await create(userInfo);
        const { password, ...userResponse } = user;
        res.status(201).send(userResponse);
    } catch(e){
        if(e.name == 'SequelizeValidationError' || e.name == 'SequelizeUniqueConstraintError'){
            res.status(400).send()
        } else {
            res.status(500).send();
            logger.error(e.message);
        }
    }
}

module.exports = {
    postController
}
