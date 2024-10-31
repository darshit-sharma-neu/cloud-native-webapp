const mysql = require("mysql2/promise");
const {logger} = require("../../utils/logger");

const dbName = process.env.DB_NAME || "";
const dbHost = process.env.DB_HOST || "";
const dbUser = process.env.DB_USER || "";
const dbPass = process.env.DB_PASS || "";
const dbPort = process.env.DB_PORT || "";

if (
    dbName == "" ||
    dbHost == "" ||
    dbUser == "" ||
    dbPass == "" ||
    dbPort == ""
) {
    logger.error(
        `Environment Missing details, please set values for all variables in ../setEnvironment.sh and run the script`
    );
} else {
    logger.info(`Connection to database ${dbHost}:${dbPort}@${dbUser}`);
    mysql
        .createConnection({
            host: dbHost,
            port: dbPort,
            user: dbUser,
            password: dbPass,
        })
        .then((connection) => {
            logger.info(`Connection Successful`);
            logger.info(`Running DB:Migration - createDatabase`);
            connection
                .query(`CREATE DATABASE IF NOT EXISTS ${dbName};`)
                .then((res) => {
                    logger.info("Database successfully created/verified");
                    process.exit(0);
                });
        });
}
