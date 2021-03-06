import express from 'express';
import config from 'config';
import log from './logger';
import connect from './db/connect';
import routes from './routes';
import cors from 'cors';
import postTrimmer from './middleware/trimRequest';
const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(postTrimmer);
app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);
  connect();
  routes(app);
});
