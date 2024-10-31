const pino = require("pino");
const path = require("path");
const fs = require("fs");
const dayjs = require("dayjs");
const { time } = require("console");
const customTimestamp = () => dayjs().format("YYYY-MM-DD HH:mm:ss");

const logPath = path.join(__dirname, "../logs/app.log");
const logWriteStream = fs.createWriteStream(logPath, { flags: "a" });
const consoleStream = pino.transport({
    target: "pino-pretty",
    options: { colorize: true }
});
const logger = pino({
    timestamp: () => `,"time":"${customTimestamp()}"`,
},
    pino.multistream([consoleStream, logWriteStream])
);

module.exports = logger;
