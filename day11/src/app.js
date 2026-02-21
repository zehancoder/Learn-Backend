const express = require('express');
const connectToDB = require('./config/database');
const authRouter = require('./routes/auth.route');
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use(cookieParser())
connectToDB()
module.exports = app;