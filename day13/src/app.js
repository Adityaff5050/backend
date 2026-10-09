const express =require("express")
const app =express()
app.use(express.json())
const cookieParse = require("cookie-parser")
const authRouter=require("./routes/auth.routes")


app.use(cookieParse())
app.use("/api/auth",authRouter)
module.exports=app