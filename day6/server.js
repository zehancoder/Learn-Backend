const app = require('./src/app')
/// use mongoose for connect with mongodb database/cluster
const mongoose = require('mongoose')
function connectTodb() {
    mongoose.connect('mongodb+srv://zehan:v2f0Yie7uktTfCHo@cluster0.9zklzw6.mongodb.net/day-6')// link from mongodb conpass copy connection string
    .then(() => { 
        console.log('connected to database'); // after connect log
        
    })
}
connectTodb()
app.listen(5173, () => {
    console.log('server is runnig');
    
})
