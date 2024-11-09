import pino from "pino";

import { Module } from 'module';

import { join } from 'path';

const require = Module.createRequire(import.meta.url);

const createLogger = (fileName = "debug.log", dirName = join(process.cwd(), 'logs')) => {
    const pinoLogger = pino({
        transport: {
          target: require.resolve('./logger.mjs'),
          options: { filename: fileName, path: dirName },
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
