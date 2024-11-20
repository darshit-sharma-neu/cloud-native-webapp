const { User } = require("../models/user.model");
const { encrypt, compare } = require("../utils/passwordEncoder");
const { statsdClient } = require("../utils/statsd");

const USER_UNAUTHORIZED = "USER_UNAUTHORIZED";
const USER_NOT_VERIFIED = "USER_NOT_VERIFIED";
const USER_AUTHORIZED = "USER_AUTHORIZED";


/**
 * Create and save user object in database
 * @param {*} userInfo
 */
async function create(userInfo) {
    const startTime = Date.now();
    const { first_name, last_name, email, password } = userInfo;
    const encryptedPassword = await encrypt(password);
    const user = User.build({
        first_name,
        last_name,
        email,
        password: encryptedPassword,
    });
    await user.save();
    statsdClient.timing("db.users.create", Date.now() - startTime);
    return user.toJSON();
}

/**
 *
 * @param {string} email
 */
async function getByEmail(email) {
    const startTime = Date.now();
    const user = await User.findOne({
        where: {
            email: email,
        },
    });
    if (!user) {
        logger.error(`No User with email ${email}`);
        return {};
    }
    statsdClient.timing("db.users.getByEmail", Date.now() - startTime);
    return user.toJSON();
}

/**
 *
 * @param {*} userInfo
 */
async function update(email, userInfo) {
    const startTime = Date.now();
    const user = await User.findOne({
        where: {
            email: email,
        },
    });
    if (userInfo.password) {
        userInfo.password = await encrypt(userInfo.password);
    }
    user.update({
        ...userInfo,
    });
    await user.save();
    statsdClient.timing("db.users.update", Date.now() - startTime);
}

/**
 * Function to authorize and authenticate user
 * @param {*} email
 * @param {*} password
 *
 *
 */
async function checkCredentials(email, password) {
    let user = await User.findOne({
        where: {
            email: email,
        },
    });
    if (!user) {
        return USER_UNAUTHORIZED;
    }
    if (!(await compare(password, user.password))) {
        return USER_UNAUTHORIZED;
    }
    if (!user.verified) {
        return USER_NOT_VERIFIED;
    }
    return USER_AUTHORIZED;
}

async function validateUser(email){
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    user.update({
        verified: true
    })
}

async function isVerified(email){
    let user = await User.findOne({
        where: {
            email: email
        }
    });
    user = user.toJSON();
    return user.verified;
}

module.exports = {
    create,
    getByEmail,
    update,
    checkCredentials,
    validateUser,
    isVerified,
    USER_UNAUTHORIZED,
    USER_NOT_VERIFIED,
    USER_AUTHORIZED
};
