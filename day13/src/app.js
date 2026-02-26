const express = require('express');
const connectToDB= require('./config/database');
const authRouter = require('./routes/auth.route');
const app = express();
const cookieParser  = require('cookie-parser')
app.use(cookieParser())
app.use(express.json());
app.use('/api/auth', authRouter);
connectToDB()
module.exports = app;

