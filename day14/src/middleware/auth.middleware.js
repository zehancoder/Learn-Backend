const jwt = require('jsonwebtoken');
async function userIdentifyMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorize user"
        });
    }
    let decode;
    try {
        decode = jwt.verify(token, process.env.jwt_secrets);
    } catch (error) {
        return res.status(401).json({
            message: "Token not found"
        });
    }
    req.user = decode;
    next()
}
module.exports = userIdentifyMiddleware;