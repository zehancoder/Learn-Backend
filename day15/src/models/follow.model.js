const mongoose = require("mongoose");
const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        ref: 'users',
        required: [true, 'follower is required']
    },
    followee: {
        type: String,
        ref: 'users',   
        required: [true, 'followee is required']
    }
}, {
    timestamps: true
});
const followModel = mongoose.model('followModel', followSchema);
module.exports = followModel;