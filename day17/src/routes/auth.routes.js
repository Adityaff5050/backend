const express=require("express")
const userModel=require("../model/userModel")
const jwt=require("jsonwebtoken")
const authRouter=express.Router()
authRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    const isUseralReadyExists=await userModel.findOne({email})
    if(isUseralReadyExists){
        return res.status(400).json({
            msg:"user already exists"
        })
    }
    const user =await userModel.create({
        name,email,password
    })
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("jwt_token",token)
    res.status(201).json({
        msg:"user registered",
        user,
        token
    })



})

authRouter.post("/login",async(req,res)=>{
const {email,password}=req.body

const user=await userModel.findOne({email})
if(!user){
    return res.status(404).json({
        msg:"user not found"
    })
}
const ispasswordMatched=user.password===password
if(!ispasswordMatched){
    return res.status(401).json({
        msg:"invalid Password"
    })
}
const token=jwt.sign({
    id:user._id
},process.env.JWT_SECRET)
res.cookie("jwt_token",token)
res.status(200).json({
    msg:"user logged in",
    user
})
})



module.exports=authRouter