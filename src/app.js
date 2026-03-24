import express from 'express';
import helmet from 'helmet';
import corsMiddleware from './middleware/cors.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

app.use(helmet());

app.use(corsMiddleware);

export default app;