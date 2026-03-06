const mongoose = require('mongoose');
const connectToDB = () => {
    mongoose.connect(process.env.mongo_uri).then(() => {
        console.log('connet success');
        
    })
}
module.exports = connectToDB;