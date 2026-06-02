import express from 'express';
import helmet from 'helmet';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use(errorHandler);

export default app;