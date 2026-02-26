const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "User already exist with this email"],
    },
    password: String
});
const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;