const mongoose =require("mongoose")

const noteSchema= new mongoose.Schema({
    titie:{
        type:String,
        require:true
    },
    description : {
        type:String,
        require:true
    }
})

const noteModel =mongoose.model("notes",noteSchema)

module.exports=noteModel