const mongoose=require("mongoose")

function connectToDB(){

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to your database")
})
}
module.exports=connectToDB