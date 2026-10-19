const express = require('express')
const userModel = require('../model/user.model')
const autRoutes = express.Router()
const jwt = require("jsonwebtoken")

autRoutes.post("/register", async (req, res) => {
    const { email, name, password } = req.body

    const isuserAlreadyExists = await userModel.findOne({ email })

    if (isuserAlreadyExists) {
        return res.status(409).json({
            msg: "user already exists, try with diff. email"
        })
    }

    const user = await userModel.create({ email, name, password })

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)
    res.status(201).json({
        msg: "user registered",
        user,
        token
    })
})  

autRouter.post("/login",async(req,res)=>{
    const {email,password} =req.body

    const user =await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            msg:"user not found"
        })
    }
    const userpasswordMatched=user.password===password
     if(!userpasswordMatched){
        return res.status(401).json({
            msg:"invalid password"
        })
     }
const token =jwt.sign({
    id:user._id,   
},process.env.JWT_SECRET)
res.cookie("jwt_token",token)
res.status(200).json({
    msg:"user logged in",
    user,
})
})

module.exports = autRoutes