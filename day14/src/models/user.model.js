const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'username already exist'],
        required: [true, 'Username is require']
    },
    email: {
        type: String,
        unique: [true, 'user exist with this email'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        require: [true, 'Password is require']
    },
    img_url: String,
    bio: String,
});
const userModel = mongoose.model('day14', userSchema);
module.exports = userModel;
