const Express = require("express");
const app = Express();
const config = require("config");
const logger = require("./utils/logger");
const healthzRouter = require("./routes/healthz.route");
const pageNotFoundRouter = require("./routes/pageNotFound.route");
const userRouter = require("./routes/user.route");
const { checkJsonValidity } = require("./middlewares/validJSON.middleware");
const { countApiCalls } = require("./middlewares/countApiCalls.middleware");


// middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(countApiCalls);

// Routes go here
app.use("/healthz", healthzRouter);
app.use("/v1/user", userRouter);
app.use("*", pageNotFoundRouter);

// Check JSON validity
app.use(checkJsonValidity);

const server = app.listen(config.get("SERVER.PORT"), () => {
    logger.info(`Server is listening on PORT: ${config.get("SERVER.PORT")}`);
});

module.exports = {
    app,
    server,
};
