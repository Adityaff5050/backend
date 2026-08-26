const express=require('express')
const noteModel=require('./model/note.model')
const cors =require("cors")


const app=express()
app.use(express.json())
app.use(cors())


//patch /api/notes
app.post("/api/notes", async (req,res)=>{
    const {title,description} = req.body
const note = await noteModel.create({
   title,description 
})
res.status(201).json({
   message :"note created successfully",
   note
})
    
})

//get /api/notes
app.get("/api/notes",async (req,res)=>{
   const mama =await noteModel.find()

   res.status(200).json({
    message:"notes fetched successfully",
    mama
   })
})
//delete /api/notes:id

app.delete("/api/notes/:id", async(req,res)=>{
    const id=req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"note deleted successfully.",
        id
    })
})

// patch /api/notes:id
app.patch("/api/notes/:id",async(req,res)=>{
    const id= req.params.id
    const {description} =req.body

    await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"desc. updated successfully",
        id 
    })
})


module.exports=app