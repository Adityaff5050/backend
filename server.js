const express = require("express")
const  app = express()

app.get("/",(req,res)=>{
    res.send("hlo bro, its response from /")
})
app.get("/about",(req,res)=>{
    res.send("this response from /about")
})
app.get("/pages",(req,res)=>{
    res.send("hlo, you sea response from /pages")
})








app.listen(3000,()=>{
    console.log("server started on http://localhost:3000")
})