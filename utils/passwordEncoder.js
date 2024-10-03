const bcrypt = require('bcrypt');

/**
 * 
 * @param {string} password 
 * @returns {stirng} encrypted password
 */
async function encrypt(plainText){
    return bcrypt.hash(plainText,10);
}

async function compare(plainText, encryptedText){
    return bcrypt.compare(plainText, encryptedText);
}

module.exports = {
    encrypt,
    compare
}