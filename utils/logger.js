const pino = require('pino');

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            coloriz: true,
        }
    }
});

module.exports = logger;