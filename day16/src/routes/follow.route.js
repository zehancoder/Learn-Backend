const express = require('express');
const { followController, unFollowUserController } = require('../controllers/follow.controller');
const userIdentifyMiddleware = require('../middleware/auth.middleware');
const followRoutes = express();
followRoutes.post('/follow/:username', userIdentifyMiddleware, followController);
followRoutes.post('/unfollow/:username', userIdentifyMiddleware, unFollowUserController);

module.exports = followRoutes;