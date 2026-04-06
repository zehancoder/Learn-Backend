import express from 'express';
import authRouter from './routes/register.route.js';
import errMiddleware from './middlewares/err.middleware.js';
const app = express();
app.use(express.json());
app.use('/', authRouter)
app.use(errMiddleware)
export default app;