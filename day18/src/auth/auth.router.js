const express =require("express")
const userModel = require("../model/user.Model")
const crypto=require("crypto")
const jwt=require("jsonwebtoken")
authRouter=express.Router()
//register api //

authRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    const isuseralReadyExist=await userModel.findOne({email})
    if(isuseralReadyExist){
        return res.status(409).json({
            msg:"user already Exist"
        })
    }
    const user=await userModel.create({
        name,
        email,
        password:crypto.createHash("md5").update(password).digest("hex")
    })
const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
res.cooki("jwt_token",token)
res.status(201).json({
    msg:"user registered Succesfully",
    user,
    token
})
})

module.exports=authRouter