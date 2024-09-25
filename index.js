const Express = require("express");
const app = Express();
const config = require("config");
const logger = require("./utils/logger");
const { connect } = require("./utils/databaseConnector");
const healthzRouter = require("./routes/healthz.route");
const pageNotFoundRouter = require("./routes/pageNotFound.route");

// middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// Routes go here
app.use("/healthz", healthzRouter);
app.use("*", pageNotFoundRouter);

connect();

app.listen(config.get("SERVER.PORT"), () => {
  logger.info(`Server is listening on POST: ${config.get("SERVER.PORT")}`);
});
