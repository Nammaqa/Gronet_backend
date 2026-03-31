import express from 'express';
import helmet from 'helmet';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';
import cors from 'cors';
const app = express();

app.use(helmet());

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Error handler (should be last)
app.use(errorHandler);

export default app;