const express=require("express")
constjwt=require("jsonwebtoken")
const authRouter=express.Router()
const userModel=require("../model/userModel")

authRouter.post("/register",async(req,res)=>{
    const {email,name,password}=req.body
    const user=await userModel.create({
    email,name,password,
})
const userAlreadyExists=await userModel.findOne({email})
if(userAlreadyExists){
    return React.status(400).json({
        msg:"user already exists,try with diff. email add."
    })
}
const token=Jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET)
res.cookie("jwt_token",token)
res.status(201).json({
    msg:"user created",
    user,
    token
})

})


module.exports=authRouter