const app = require('./src/app')
/// use mongoose for connect with mongodb database/cluster
const mongoose = require('mongoose')
function connectTodb() {
    mongoose.connect('')// link from mongodb conpass copy connection string
    .then(() => { 
        console.log('connected to database'); // after connect log
        
    })
}
connectTodb()
app.listen(5173, () => {
    console.log('server is runnig');
    
})
