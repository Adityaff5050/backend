const express=require("express")
const authRouter =express.Router()
const userModel=require("../model/user.model")
const jwt =require("jsonwebtoken")
authRouter.post("/register",async(req,res)=>{
    const {email,name,password}=req.body

    const isuserAlreadyExists = await userModel.findOne({email})

    if(isuserAlreadyExists){
        return res.status(409).json({
            msg:"user already exists, plz, try again with diff. email"
        })
    }
const user =await userModel.create({
    name,email,password
})
const token =jwt.sign({id:user._id, email:user.email},
    process.env.JWT_SECRET
)
res.cookie("jwt_token",token)
res.status(201).json({
    msg:"user registered",
    user,
    token
})
})

module.exports=authRouter