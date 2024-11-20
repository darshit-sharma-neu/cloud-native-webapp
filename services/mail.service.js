const AWS = require('aws-sdk');
const { logger } = require('../utils/logger');
const config = require('config')
async function sendVerificationEmail(email, token) {
    const ses = new AWS.SNS();
    const payload = JSON.stringify({
        email,
        token
    });
    const params = {
       Message: payload,
       TopicArn: config.get("SNS.ARN")
    }
    try{
        await ses.publish(params).promise();
    } catch (e) {
        logger.error(e.message);
    }
}

module.exports = {
    sendVerificationEmail
}