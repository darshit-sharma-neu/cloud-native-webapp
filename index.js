const Express = require('express');
const app = Express();
const config = require('config');
const logger = require('./utils/logger');

// Routes go here

app.listen(config.get("server.PORT_NUMBER"), () => {
    logger.info(`Server is listening on POST: ${config.get("server.PORT_NUMBER")}`);
});

