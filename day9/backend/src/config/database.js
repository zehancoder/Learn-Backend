const mongoose = require('mongoose');
const connectTodb = () => {
    mongoose.connect(process.env.note_uri)
    .then(() => {
        console.log('succesfully connect to db');
        
    })
}
module.exports = connectTodb
