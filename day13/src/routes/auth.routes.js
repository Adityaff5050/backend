const express= require("express")
const userModel=require("../model/user.model")
const authRouter =express.Router()

authRouter.post("/register",async(req,res)=>{
const {email,name,password} =req.body

const user= await userModel.create({
    email,password,name
})
res.status(201).json({
    msg : "user registered",
    user
})
})



module.exports =authRouter