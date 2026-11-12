const express=require("express")
const app=express()
const authRouter=require("./auth/auth.router")
const cookieparser=require("cookie-parser")
app.use(express.json())

app.use(cookieparser())
app.use("/api/auth",authRouter)


module.exports=app