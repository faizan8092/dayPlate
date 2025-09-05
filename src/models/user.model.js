

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    email:
    {
        required: true,
        unique: true,
        lowercase: true,
        type: String,
        trim: true
    },
    password: {
        required: true,
        minlength: 6,
        type: String
    },
    fullname: {
        required: true,
        type: String,
        trim: true,
        minlength: 2,
        
    }
},
    { timestamps: true }
);


// Hash password before saving.

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
})

// compare password
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User;