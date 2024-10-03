const { User } = require("../models/user.model");
const { encrypt } = require("../utils/passwordEncoder");

/**
 * Create and save user object in database
 * @param {*} userInfo
 */
async function create(userInfo) {
    const { first_name, last_name, email, password } = userInfo;
    const encryptedPassword = await encrypt(password);
    const user = User.build({
        first_name,
        last_name,
        email,
        password: encryptedPassword,
    });
    await user.save();
    return user.toJSON();
}

/**
 *
 * @param {string} email
 */
async function getByEmail(email) {
    const user = await User.findOne({
        where: {
            email: email,
        },
    });
    if (!user) {
        logger.error(`No User with email ${email}`);
        return {};
    }
    return user.toJSON();
}

/**
 *
 * @param {*} userInfo
 */
async function update(email, userInfo) {
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
}

module.exports = {
    create,
    getByEmail,
    update,
};
