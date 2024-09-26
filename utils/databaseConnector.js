const { Sequelize } = require("sequelize");
const config = require("config");
const logger = require("../utils/logger");

let sequelize;

const connect = () => {
    logger.info("Connecting to database");
    sequelize = new Sequelize(
        config.get("DATABASE.NAME"),
        config.get("DATABASE.USER"),
        config.get("DATABASE.PASSWORD"),
        {
            host: config.get("DATABASE.HOST"),
            dialect: "mysql",
            logging: false,
        }
    );
    sequelize
        .authenticate()
        .then(() => {
            logger.info(`Connected to Database`);
        })
        .catch((error) => {
            logger.error(`Connection to DB failed: ${error}`);
        });
};

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        return true;
    } catch (error) {
        logger.error("Unable to connect to database");
        return false;
    }
};

module.exports = {
    connect,
    checkConnection,
};
