const express = require("express")
const noteModel =require("./model/notes.model")

const app=express()
app.use(express.json())
const cors =require("cors")
app.use(cors())

//POST //api/notes
app.post("/api/notes",async(req,res)=>{
    const {title,description} = req.body
    const notes = await noteModel.create(
        {
            title,description
        }
    )
    res.status(201).json({
        msg:"notes created successfully",
        notes
    })
})

//GET /api/notes

app.get("/api/notes",async(req,res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        msg:"notes fetched successfully",
        notes
    })
})

//delete //api/notes/:id

app.delete("/api/notes/:id",async(req,res)=>{
    const id=req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"note deleted"
    })
})

//patch /api/notes:id
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
