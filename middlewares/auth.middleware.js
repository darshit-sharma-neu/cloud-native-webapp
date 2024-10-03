const { User } = require("../models/user.model");
const { Request, Response, NextFunction } = require("express");
const { compare } = require("../utils/passwordEncoder");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function checkAuth(req, res, next) {
    try {
        if (req.headers.authorization) {
            const [email, password] = new Buffer.from(
                req.headers.authorization.split(" ")[1],
                "base64"
            )
                .toString()
                .split(":");
            let user = await User.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                res.status(401).send();
            } else if (!(await compare(password, user.password))) {
                res.status(401).send();
            } else {
                const userContext = {
                    email,
                };
                req.userContext = userContext;
                next();
            }
        } else {
            res.status(401).send();
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    checkAuth,
};
