import { createStream } from 'rotating-file-stream';

export default (options) => {
    const {
        filename,
        size = '100M',
        maxSize = '500M',
        interval = '7d',
        compress = 'gzip',
        path = "./logs",
    } = options;
    return createStream(filename, {
        size,
        maxSize,
        interval,
        compress,
        path,
    });
};
