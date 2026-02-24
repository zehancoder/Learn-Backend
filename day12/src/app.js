const express = require('express');
const authRouter = require('./routes/auth.route');
const app = express();
const connectToDB = require('./config/database');
app.use(express.json())
app.use('/api/auth', authRouter);
connectToDB()
module.exports = app