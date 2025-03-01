import { logger } from './index.mjs';

const main = async () => {
    logger.log("Hello world")
    await logger.destroy()
    console.log("Ok");
}

main();
