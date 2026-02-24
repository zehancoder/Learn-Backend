const mongoose = require('mongoose');
const connectToDB = () => {
    mongoose.connect(process.env.mongoose_uri).then(() => {
        console.log('db connect success');
        
    })
}
module.exports = connectToDB;