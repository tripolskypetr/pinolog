import pino from "pino";

import { Module } from 'module';

const require = Module.createRequire(import.meta.url);

const createLogger = (fileName = "debug.log") => {
    const pinoLogger = pino({
        transport: {
          target: require.resolve('./logger.mjs'),
          options: { filename: fileName },
        },
    });

    return new class {
        log = (...args) => {
            pinoLogger.info({
                logLevel: "log",
                args,
            });
        };
        info = (...args) => {
            pinoLogger.info({
                logLevel: "info",
                args,
            });
        };
        warn = (...args) => {
            pinoLogger.warn({
                logLevel: "warn",
                args,
            });
        };
        error = (...args) => {
            pinoLogger.error({
                logLevel: "error",
                args,
            });
        };
    }
}

const logger = createLogger();

export const { error, info, log, warn } = logger;

export { logger, createLogger };
