import pino from "pino";

import { Module } from 'module';

import { join } from 'path';

const require = Module.createRequire(import.meta.url);

const createLogger = (fileName = "debug.log", dirName = join(process.cwd(), 'logs')) => {

    const pinoTransport = pino.transport({
        target: require.resolve('./logger.mjs'),
        options: { filename: fileName, path: dirName },
    })

    const pinoLogger = pino(pinoTransport);

    const flush = () => new Promise((res, rej) => {
        if (!pinoLogger.flush) {
            res();
            return;
        }
        pinoLogger.flush((error) => {
            if (error) {
                rej(error);
                return
            }
            res();
        })
    });

    return new class {
        flush = async () => {
            await flush();
        };
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
        destroy = async () => {
            await flush();
            pinoTransport.end();
        };
    }
}

const logger = createLogger();

export const { error, info, log, warn, destroy } = logger;

export { logger, createLogger };
