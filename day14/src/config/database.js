require('dotenv').config()
const mongoose =require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("conected to user database");
        
    })
}
module.exports=connectToDb