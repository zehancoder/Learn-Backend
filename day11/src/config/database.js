const mongoose = require('mongoose');
const connectToDB = () => {
    mongoose.connect(process.env.mongoose_uri).then(()=> {
        console.log('connected to DB');
        
    })
}
module.exports = connectToDB;