const express=require('express')
const app=express()
const autRoutes=require("./routes/auth.routes")
app.use(express.json())
const cookieParser =require("cookie-parser")
app.use(cookieParser())
app.use("/api/auth",autRoutes)


module.exports=app