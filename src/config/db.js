
const mongoose = require("mongoose");

async function connectDB(uri){
    try{
        await mongoose.connect(uri)
        console.log("MongoDB Database connected successfully")
    }catch(err){
        console.error("Database connection Error", err)
        process.exit(1)
    }

}

module.exports = connectDB;