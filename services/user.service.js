const { User } = require("../models/user.model");
const { encrypt } = require("../utils/passwordEncoder");

/**
 * Create and save user object in database
 * @param {*} userInfo
 */
async function create(userInfo) {
    const { firstName, lastName, email, password } = userInfo;
    const encryptedPassword = await encrypt(password);
    const user = User.build({
        firstName,
        lastName,
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

module.exports = {
    create,
    getByEmail,
};
