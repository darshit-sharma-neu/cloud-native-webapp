const { Request, Response, NextFunction } = require("express");
const { create, getByUserEmail, deleteImageByUserEmail  } = require("../services/profileImage.service");
const {logger} = require("../utils/logger");
const fs = require("fs");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function postController(req, res, next) {
    try{ 
        const queryParamsLen = req.query ? Object.keys(req.query).length : 0
        if(!req.file || queryParamsLen != 0){
            res.status(400).send();
            return;
        }
        logger.info("postController - Uploading file to S3");
        const response = await create(req.file.path, req.file.originalname, req.userContext.email);
        if(response.profileImage){
            res.status(201).send(response.profileImage);
        } else {
            res.status(400).send();
        }
    } catch(err){
        logger.error(err.message);  
        res.status(500).send(); 
    }
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function getController(req, res, next) {
   try{
    const contentLenght = req.get("Content-Length");
    const queryLenght = Object.keys(req.query).length;
    if (contentLenght || queryLenght) {
        res.status(400).send();
        return;
    }

    const response = await getByUserEmail(req.userContext.email);
    if(response.response == null){
        res.status(404).send();
        return;
    }

    res.status(200).send(response.response);

   } catch (err){
    logger.error(err.message);
    res.status(500).send();
   }
}

async function deleteController(req,res,next){
    try{
        const contentLenght = req.get("Content-Length");
        const queryLenght = Object.keys(req.query).length;
        if (contentLenght || queryLenght) {
            res.status(400).send();
            return;
        }

        const response = await deleteImageByUserEmail(req.userContext.email);
        if(response.imageNotFound){
            res.status(404).send();
            return;
        } else if(response.deleteFailed){
            res.status(500).send();
            return;
        }
        else{
            res.status(204).send();
        }


    } catch(err){
        logger.error(err.message);
        res.status(500).send();
    }
}

module.exports = {
    postController,
    getController,
    deleteController
};
