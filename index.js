const Express = require('express');
const app = Express();
const config = require('config');
const logger = require('./utils/logger');
const { connect } = require('./utils/databaseConnector');
const healthzRouter = require('./routes/healthz.route');

// Routes go here
app.use('/healthz', healthzRouter);

connect();

app.listen(config.get("SERVER.PORT"), () => {
    logger.info(`Server is listening on POST: ${config.get("SERVER.PORT")}`);
});

