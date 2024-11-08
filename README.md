# pinolog

>  The preset of [pino](https://www.npmjs.com/package/pino) with [rotating-file-stream](https://www.npmjs.com/package/rotating-file-stream)

## Usage

The next code will create `logs` folder with `debug.log` file. When the file reach the `100Mb` limit, it will be compressed to `20241003-1132-01-debug.log.gz`.

```tsx
import { logger } from 'pinolog';

logger.log("Hello world")

```
