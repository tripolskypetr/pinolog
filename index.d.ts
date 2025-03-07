declare module "pinolog" {

    interface ILogger {
        log(...args: unknown[]): void;
        info(...args: unknown[]): void;
        warn(...args: unknown[]): void;
        error(...args: unknown[]): void;
        destroy(...args: unknown[]): void;
        flush(...args: unknown[]): void;
    }

    export const logger: ILogger;

    export function log(...args: unknown[]): void;
    export function info(...args: unknown[]): void;
    export function warn(...args: unknown[]): void;
    export function error(...args: unknown[]): void;
    export function destroy(...args: unknown[]): void;
    export function flush(...args: unknown[]): void;

    export function createLogger(fileName: string, dirName?: string): ILogger;

}
