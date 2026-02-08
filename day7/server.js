require('dotenv').config()
const app = require('./src/app');
const connectTodb = require('./src/config/database');
// for hideing URI in dotenv (npm i dotenv)
connectTodb()

app.listen(5173, () => {
    console.log('server start');
    
});