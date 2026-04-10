import dotenv from 'dotenv';
dotenv.config()
import app from './src/app.js';
import connectToDB from './src/config/database.js';


connectToDB()
app.listen(process.env.PORT, () => {
    console.log('server run on port 3000')
})