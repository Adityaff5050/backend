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
res.cookie("jwt_token",token)
res.status(201).json({
    msg:"user registered Succesfully",
    user,
    token
})
})


//Login//
authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user =await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            msg:"user not found"
        })
    }
    const hashPassword=crypto.createHash("md5").update(password).digest("hex")
    const ispasswordMatched=user.password===hashPassword
    if(!ispasswordMatched){
        return res.status(401).json({
            msg:"invalid password"
        })
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("login_token",token)
    res.status(200).json({
        msg:"user logged in",
        user
    })
})

module.exports=authRouter