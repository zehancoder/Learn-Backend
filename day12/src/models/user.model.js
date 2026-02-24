const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, 'user Already exist with this email adress']
    },
    password: String
});
const userModel = mongoose.model('day12', userSchema);
module.exports = userModel;