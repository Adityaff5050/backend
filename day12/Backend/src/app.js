const express =require("express")
const app =express()
app.use(express.json())
const cors = require("cors")
const noteModel = require("./model/note.model")
app.use(cors())

const path =require("path")
app.use(express.static("./public"))

//post /api/notes
app.post("/api/notes",async(req,res)=>{
    const {title,description}=req.body
    const notes=await noteModel.create({
        title,description
    })
    res.status(201).json({
        msg :"note created",
        notes
    })

})
//get /api/
app.get("/api/notes",async(req,res)=>{
    const notes=await noteModel.find()
    res.status(200).json({
        msg :"note fetched",
        notes
    })
})

//delete/api/notes/:id

app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        msg :` ${id} this id notes is deleted`
    })
})

//patch /api/notes/:id

app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const {description} =req.body

    await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
    msg : `this ${id} description updated with new description ${description}`
    })

    })
  
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})
module.exports=app