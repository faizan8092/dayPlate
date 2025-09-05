

const User = require("../models/user.model")
const {signToken} = require('../utils/jwt')

exports.signup = async (req, res, next) => {
    try {
        const { email, password,fullname } = req.body;
        const existing = await User.findOne({ email })
        if (existing) return res.status(400).json({ error: "Email already exists, Please login" })
        
        if (fullname.length < 2) return res.status(400).json({ error: "Min 2 character is required for full name" })

            
        const user = await User.create({ email, password, fullname });
        res.status(201).json({
            message: "Signup Successfull",
            user: { id: user._id, email: user.email, fullname: user.fullname }
        })

    } catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(user);
    res.json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
}