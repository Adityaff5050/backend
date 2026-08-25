const express = require('express')
const app = express()

const noteModel = require('./model/noteModel')
app.use(express.json())

//post /notes
app.post("/notes",async(req,res)=>{
    const {title,description} = req.body
    const notes = await noteModel.create({
        title,description
    })
res.status(201).json({
    message :'Note Created ',
    notes
})
})

//get /notes
app.get("/notes",async(req,res)=>{
  const notes= await  noteModel.find()
  res.status(200).json({
    message:"notes fetched",
    notes
  })
})





module.exports = app