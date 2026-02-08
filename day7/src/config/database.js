const mongoose = require('mongoose')

const connectTodb = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('seccessfuly connect');
        
    })
}

module.exports = connectTodb