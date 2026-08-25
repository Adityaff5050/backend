const express=require("express")
const app = express()
const notes=[]
app.use(express.json())
// Get /
app.get("/",(req,res)=>{
    res.send("hello world")
})
//post /notes
app.post("/notes",(req,res)=>
{
    console.log(req.body)
    notes.push(req.body)
    console.log(notes)
    res.send("note created ")
})
//Get /notes
app.get("/notes",(req,res)=>{
    res.send(notes)
})

//Delete /notes
app.delete("/notes/:index",(req,res)=>{
delete notes[req.params.index]
res.send("note deleted successfully")
})

//PATCH /notes/:index
//req.body={description:-"sample modifed description"}

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description=req.body.description

    res.send("note updated")


}
)

module.exports=app