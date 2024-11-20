const { UserVerification } = require("../models/verification.model");
const crypto = require('crypto');

/**
 * Create user verification token
 * @param {String} userEmail 
 * @returns {boolean}
 */
async function create(userEmail) {
    const token = crypto.randomBytes(20).toString('hex');
    let verificationRecord = UserVerification.build({
        token,
        user_email: userEmail
    });
    verificationRecord = await verificationRecord.save();
    return verificationRecord.toJSON();
}

async function getTokenByUserEmail(userEmail){
    const verificationRecord = await UserVerification.findOne({
        where: {
            user_email: userEmail
        }
    });
    return verificationRecord;
}

/**
 * 
 * @param {UserVerification} token 
 */
async function checkTokenValidity(token, recievedToken){
    const currentTime = new Date();
    const tokenTime =  new Date(token.created_at);

    const diff = currentTime - tokenTime;
    if(diff >= 120000){
        return {
            timeout: true
        };
    }
    if(recievedToken !== token.token){
        return{
            invalid: true
        }
    }
    return {
        valid: true
    }
}

module.exports = {
    create,
    getTokenByUserEmail,
    checkTokenValidity
}