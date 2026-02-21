const mongoose = require('mongoose');
const userShcema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, 'with this email user already exist']
    },
    password: String
});
const userModel = mongoose.model('day11_users', userShcema);
module.exports = userModel