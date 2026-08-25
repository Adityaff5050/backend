const express = require("express")
const app = express()

const port = 3000

const mongoose = require('mongoose')
function connetToDb() {
mongoose.connect("mongodb+srv://r89588907_db_user:Aditya123@cluster0.07cobcb.mongodb.net/day6") 
.then(()=>{
        console.log("Connected to Database")
    }) 

}
connetToDb()






app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
    
})


module.exports = app