const mongoose = require('mongoose');
const connectToDB = () => {
    mongoose.connect(process.env.mongoose_uri).then(() => console.log('connect to DB successs'))
}
module.exports = connectToDB;