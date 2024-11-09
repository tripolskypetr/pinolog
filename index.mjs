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
                createdAt: new Date(),
                createdBy: fileName,
                args,
            });
        };
        info = (...args) => {
            pinoLogger.info({
                logLevel: "info",
                createdAt: new Date(),
                createdBy: fileName,
                args,
            });
        };
        warn = (...args) => {
            pinoLogger.warn({
                logLevel: "warn",
                createdAt: new Date(),
                createdBy: fileName,
                args,
            });
        };
        error = (...args) => {
            pinoLogger.error({
                logLevel: "error",
                createdAt: new Date(),
                createdBy: fileName,
                args,
            });
        };
    }
}

const logger = createLogger();

export const { error, info, log, warn } = logger;

export { logger, createLogger };
