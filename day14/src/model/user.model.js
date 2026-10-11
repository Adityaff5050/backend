const mongoose=require("mongoose")

const userSchema =new mongoose.Schema({
    name :String,
    email: {
        type: String,
        unique
    },
    password :String
})

userModel=mongoose.model("users",userSchema)

module.exports=userModel