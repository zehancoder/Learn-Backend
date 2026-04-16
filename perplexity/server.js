import dotenv from 'dotenv';
dotenv.config()
import app from './src/app.js';
import connectToDB from './src/config/database.js';
import { testAi } from './src/services/ai.service.js';
testAi()
connectToDB()
app.listen(process.env.PORT, () => {
    console.log('server run on port 3000')
})