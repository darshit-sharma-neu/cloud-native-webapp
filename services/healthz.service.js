const {Request, Response, NextFunction} = require('express');
const { checkConnection } = require('../utils/databaseConnector')


/**
 * Handler for healthz GET endpoint
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function getHandler(req, res, next) {

    const contentLenght = req.get("Content-Length");
    const queryLenght = Object.keys(req.query).length;
    res.set('cache-control', 'no-cache');
    if(contentLenght || queryLenght){
        res.status(400).send();
    } else {
        if(await checkConnection()){
            res.status(200).send();
        } else {
            res.status(503).send();
        }
    }
}

/**
 * Handler for healthz all METHODS other than GET
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function methodNotAllowedHandler(req,res,next){
    res.status(405).send();
}

module.exports = {
    getHandler,
    methodNotAllowedHandler
}