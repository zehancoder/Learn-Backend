const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

const followController = async (req, res) => {
    const followerId = req.user.id; // I follow followee person
    const followee = req.params.username; // I follow this person using my cookies token info;
    const follower = await userModel.findById(followerId)
    if (followee === follower.username) {
        res.status(409).json({
            message: "you can't follow  yourself"
        })
    }
    const isFolloweeExist = await followModel.findOne({
        follower: follower.username,
        followee
    });
    if (isFolloweeExist) {
        return res.status(200).json({
            message: "You alraedy follow " + followee
        });
    }
    const isUserNotExist = await userModel.findOne({
        username: followee
    });
    if (!isUserNotExist) {
        return res.status(404).json({
            message: "This user not exist with this username"
        });
    }
    const newFolloee = await followModel.create({
        follower: follower.username,
        followee
    });
    res.status(201).json({
        message: "you follow "+ followee,
        newFolloee
    })
}
const unFollowUserController = async (req, res) => {
    const followee = req.params.username;
    const followerId = req.user.id;
    const follower = await userModel.findById(followerId);

    const userFollow = await followModel.findOne({
        followee,
        follower: follower.username
    });
    if (!userFollow) {
        res.status(200).json({
            message: "you are not following " + followee
        })
    }
    await followModel.findByIdAndDelete(userFollow._id);
    res.status(200).json({
        message: "you unfollow " + followee
    })
}
module.exports = {
    followController,
    unFollowUserController
}