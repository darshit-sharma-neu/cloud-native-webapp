const {Request, Response, NextFunction} = require('express');
const { checkConnection } = require('../utils/databaseConnector')


/**
 * Handler for healthz GET endpoint
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
async function getHandler(req, res, next) {
    if(await checkConnection()){
        res.set('cache-control', 'no-cache')
        res.status(200).send();
    } else {
        res.status(503).send();
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