import cookieParser from 'cookie-parser';
import express from 'express';
import authRouter from './routes/auth.route.js';
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/', authRouter)


export default app;