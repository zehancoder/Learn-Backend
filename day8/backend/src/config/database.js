const mongoose = require('mongoose');

const connectTodb = () =>{
    mongoose.connect(process.env.mongooes_uri).then(() => {
        console.log('seccessfully connect to mongodb');
        
    })
}
module.exports = connectTodb;