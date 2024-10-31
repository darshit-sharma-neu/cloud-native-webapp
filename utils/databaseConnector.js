const { Sequelize } = require("sequelize");
const config = require("config");
const {logger} = require("../utils/logger");

let sequelize;
const connect = () => {
    logger.info("Connecting to database");
    let seq = new Sequelize(
        config.get("DATABASE.NAME"),
        config.get("DATABASE.USER"),
        config.get("DATABASE.PASSWORD"),
        {
            host: config.get("DATABASE.HOST"),
            dialect: "mysql",
            logging: false,
            sync: true,
        }
    );
    seq.authenticate()
        .then(() => {
            logger.info(`Connected to Database`);
        })
        .catch((error) => {
            logger.error(`Connection to DB failed: ${error}`);
        });
    return seq;
};
sequelize = connect();

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        return true;
    } catch (error) {
        logger.error("Unable to connect to database");
        return false;
    }
};

/**
 * returns sequelize object
 * @returns {Sequelize} sequelize
 */
const getSequelize = () => {
    if (sequelize == null) {
        sequelize = connect();
    }
    return sequelize;
};

module.exports = {
    connect,
    checkConnection,
    getSequelize,
};
