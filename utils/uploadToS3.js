const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const logger = require('./logger')
const config = require('config')

/**
 * 
 * @param {String} filePath 
 * @param {String} fileName 
 */
const uploadToS3 = async (filePath, fileName, userId) => {
    try{

        const fileContent = fs.readFileSync(filePath);
        const uploadParams = {
            Bucket: config.get("S3.BUCKET_NAME"),
            Key: `${userId}/${fileName}`, // File name on S3
            Body: fileContent,
            ContentType: fileContent.fileType,
        }
        const s3 = new AWS.S3()
        const upload = await s3.upload(uploadParams).promise();
        if(!upload){
            throw new Error("Upload to s3 failed");
        }else {
            fs.unlinkSync(filePath);
            return {
                fileUrl: upload.Location
            }
        }

    } catch (err) {
        logger.error(err.message);
        throw new Error("Error in uploading file to S3");
    }
}

async function deleteImage(filePath){
    try{
        const s3 = new AWS.S3();
        const deleteParams = {
            Bucket: config.get("S3.BUCKET_NAME"),
            Key: filePath,
        }
        await s3.deleteObject(deleteParams).promise();
        return true;
    } catch (err){
        logger.error(err.message);
        throw new Error("Error in deleting file from S3");
    }
   
}

module.exports = {
    uploadToS3,
    deleteImage
}