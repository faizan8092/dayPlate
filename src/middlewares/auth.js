const {verifyToken} = require('../utils/jwt')

const User = require('../models/user.model');

module.exports = async function auth(req, res, next) {
    try {
        const header = req.headers["authorization"];
        if(!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({error: "Token is requierd"})
        }


        const token = header.split(" ")[1];
        const decode = verifyToken(token);

        const user = await User.findById(decode.id);
        if(!user) return res.status(401).json({error:"Invalid Token"})

        req.user = user;
        next();


    } catch (error) {
        return res.status(401).json({error: "Unauthorized"})
    }
};