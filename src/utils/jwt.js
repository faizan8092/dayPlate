
const jwt = require('jsonwebtoken');


function signToken(user){
    return jwt.sign(
        { id: user._id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}

    )
}

function verifyToken (token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}


module.exports = {signToken, verifyToken};



