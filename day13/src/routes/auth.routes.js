const express= require("express")
const userModel=require("../model/user.model")
const authRouter =express.Router()

authRouter.post("/register",async(req,res)=>{
const {email,name,password} =req.body

const isUserAlreadyExists =await userModel.findOne({email})
if(isUserAlreadyExists){
    return res.status(400).json({
        msg:"user alredy exist plz. try again with diff. email"
    })
}
const user= await userModel.create({
    email,password,name
})
res.status(201).json({
    msg : "user registered",
    user
})
})



module.exports =authRouter