import * as http from 'http';
import config from './config';

(async function main(): Promise<void> {
  try {
    const appServer = http.createServer((req, res) => {
      res.write('It works!');
      res.end();
    });
    appServer.listen(config.api.port, () => {
      console.log(`API active at http://localhost:${config.api.port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}());
